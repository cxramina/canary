import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  TypesExecution,
  TypesStage,
  useCancelExecutionMutation,
  useCreateExecutionMutation,
  useFindExecutionQuery,
  useViewLogsQuery
} from '@harnessio/code-service-client'
import { Badge, DropdownMenuItem, Icon, ScrollArea, Separator, SplitButton, Text } from '@harnessio/canary'
import {
  Layout,
  ExecutionTree,
  ExecutionStatus,
  StageExecution,
  ContactCard,
  convertExecutionToTree,
  StageProps,
  getStepId,
  parseStageStepId
} from '@harnessio/playground'
import { PathParams } from '../../RouteDefinitions'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { SSEEvent, ExecutionState } from '../../types'
import { getDuration, timeAgoFromEpochTime, formatDuration } from '../pipeline-edit/utils/time-utils'
import useSpaceSSE from '../../framework/hooks/useSpaceSSE'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import { usePipelineDataContext } from '../pipeline-edit/context/PipelineStudioDataProvider'

const ExecutionLogs: React.FC = () => {
  const { gitInfo } = usePipelineDataContext()
  const navigate = useNavigate()
  const space = useGetSpaceURLParam() ?? ''
  const { pipelineId, executionId } = useParams<PathParams>()
  const repoRef = useGetRepoRef()
  const [stage, setStage] = useState<TypesStage>()
  const [stageNum, setStageNum] = useState<number>(1)
  const [stepNum, setStepNum] = useState<number>(1)
  const [execution, setExecution] = useState<TypesExecution | undefined>()
  const pipelineIdentifier = pipelineId || ''
  const executionNum = executionId || ''

  const { data: initialExecutionData } = useFindExecutionQuery({
    pipeline_identifier: pipelineIdentifier,
    execution_number: executionNum,
    repo_ref: repoRef
  })

  const { mutateAsync: cancelExecution } = useCancelExecutionMutation({
    pipeline_identifier: pipelineIdentifier,
    execution_number: executionNum,
    repo_ref: repoRef
  })

  const { mutateAsync: rerunExecution } = useCreateExecutionMutation({
    pipeline_identifier: pipelineIdentifier,
    repo_ref: repoRef,
    queryParams: { branch: gitInfo?.default_branch }
  })

  useEffect(() => {
    setExecution(initialExecutionData)
  }, [initialExecutionData])

  const onEvent = useCallback(
    (data: TypesExecution) => {
      if (
        data?.repo_id === execution?.repo_id &&
        data?.pipeline_id === execution?.pipeline_id &&
        data?.number === execution?.number
      ) {
        setExecution(data)
      }
    },

    [execution?.number, execution?.pipeline_id, execution?.repo_id]
  )

  const isPipelineStillExecuting: boolean = useMemo(
    () => [ExecutionState.RUNNING, ExecutionState.PENDING].includes(execution?.status as ExecutionState),
    [execution?.status]
  )

  useSpaceSSE({
    space,
    events: useMemo(
      () => [
        SSEEvent.EXECUTION_UPDATED,
        SSEEvent.EXECUTION_COMPLETED,
        SSEEvent.EXECUTION_CANCELED,
        SSEEvent.EXECUTION_RUNNING
      ],
      []
    ),
    onEvent,
    shouldRun: isPipelineStillExecuting
  })

  const { data: logs } = useViewLogsQuery(
    {
      pipeline_identifier: pipelineIdentifier,
      execution_number: executionNum,
      repo_ref: repoRef,
      stage_number: String(stageNum),
      step_number: String(stepNum)
    },
    { enabled: isPipelineStillExecuting }
  )

  useEffect(() => {
    if (execution?.stages && execution.stages.length > 0) {
      const stageIdx = stageNum > 0 ? stageNum - 1 : 0
      setStage(execution.stages[stageIdx])
    }
  }, [execution?.stages, stageNum])

  const handleRerun = (): void => {
    rerunExecution({})
      .then(response => {
        const executionId = response.number
        navigate(`../executions/${executionId}`)
      })
      .catch()
  }

  const handleCancel = (): void => {
    cancelExecution({}).then().catch()
  }

  return (
    <>
      <div className="absolute right-0 top-0 w-fit">
        <div className="flex items-center gap-x-3 h-14 px-4">
          <SplitButton
            size="sm"
            onClick={handleRerun}
            dropdown={<Icon name="chevron-down" size={12} />}
            menu={
              <>
                <DropdownMenuItem onClick={handleCancel} disabled={!isPipelineStillExecuting}>
                  Cancel
                </DropdownMenuItem>
              </>
            }>
            <Icon name="lightning" className="mr-2" />
            Rerun
          </SplitButton>
        </div>
      </div>
      <Layout.Horizontal className="px-8">
        <div className="w-2/3">
          {stage && (
            <StageExecution
              stage={stage as StageProps}
              logs={logs ?? []}
              selectedStepIdx={stepNum > 0 ? stepNum - 1 : 0}
              onEdit={() => navigate('../edit')}
            />
          )}
        </div>
        <ScrollArea className="w-1/3 h-[calc(100vh-16rem)] pt-4">
          <ContactCard authorEmail={execution?.author_email || ''} authorName={execution?.author_name} />
          <div className="flex flex-col gap-2 my-5">
            <Text className="text-white text-base">{execution?.message}</Text>
            <div className="flex gap-2 items-center">
              <Badge variant="secondary" className="bg-primary-foreground flex gap-1">
                <Layout.Horizontal gap="space-x-1" className="flex items-center">
                  <Icon size={12} name={'tube-sign'} />
                  <Text className="text-sm text-git pb-0.5">{execution?.source}</Text>
                </Layout.Horizontal>
              </Badge>
              <span>to</span>
              <Badge variant="secondary" className="flex gap-1 bg-primary-foreground">
                <Layout.Horizontal gap="space-x-1" className="flex items-center">
                  <Icon size={12} name={'git-branch'} />
                  <Text className="text-sm text-git pb-0.5">{execution?.target}</Text>
                </Layout.Horizontal>
              </Badge>
            </div>
          </div>
          <Layout.Horizontal>
            {execution?.status && (
              <Layout.Vertical gap="space-y-1">
                <Text className="text-sm text-muted-foreground">Status</Text>
                <ExecutionStatus.Badge
                  status={execution.status as ExecutionState}
                  minimal
                  duration={formatDuration(getDuration(execution?.started, execution?.finished))}
                />
              </Layout.Vertical>
            )}
            {execution?.created && (
              <Layout.Vertical gap="space-y-1">
                <Text className="text-sm text-muted-foreground">Created</Text>
                <span className="text-white">{timeAgoFromEpochTime(execution.created)}</span>
              </Layout.Vertical>
            )}
          </Layout.Horizontal>
          <Separator className="my-4" />
          {execution && (
            <ExecutionTree
              defaultSelectedId={getStepId(stageNum, stepNum)}
              elements={convertExecutionToTree(execution)}
              onSelectNode={({ childId: fullStepId }: { parentId: string; childId: string }) => {
                try {
                  const { stageId, stepId } = parseStageStepId(fullStepId) || {}
                  if (!isNaN(Number(stageId))) {
                    setStageNum(Number(stageId))
                  }
                  if (!isNaN(Number(stepId))) {
                    setStepNum(Number(stepId))
                  }
                } catch {
                  // Ignore exception
                }
              }}
            />
          )}
        </ScrollArea>
      </Layout.Horizontal>
    </>
  )
}

export const Execution: React.FC = () => {
  return <ExecutionLogs />
}
