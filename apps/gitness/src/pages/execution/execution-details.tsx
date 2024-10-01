import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TypesStage, useFindExecutionQuery, useViewLogsQuery } from '@harnessio/code-service-client'
import { Badge, Icon, ScrollArea, Separator, Text } from '@harnessio/canary'
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
import { ExecutionState } from '../../types'
import { getDuration, timeAgoFromEpochTime, formatDuration } from '../pipeline-edit/utils/time-utils'
import usePolling from '../../framework/hooks/usePolling'

const POLLING_INTERVAL = 5_000

const ExecutionLogs: React.FC = () => {
  const navigate = useNavigate()
  const { pipelineId, executionId } = useParams<PathParams>()
  const repoRef = useGetRepoRef()
  const [stage, setStage] = useState<TypesStage>()
  const [stageNum, setStageNum] = useState<number>(1)
  const [stepNum, setStepNum] = useState<number>(1)
  const pipelineIdentifier = pipelineId || ''
  const executionNum = executionId || ''

  const { refetch: fetchExecution } = useFindExecutionQuery({
    pipeline_identifier: pipelineIdentifier,
    execution_number: executionNum,
    repo_ref: repoRef
  })

  const { data: polledExecutionData, stopPolling } = usePolling(fetchExecution, POLLING_INTERVAL)
  const execution = polledExecutionData?.data

  useEffect(() => {
    /**
     * Could be done on other statuses as well, such as, Aborted, Expired etc.
     */
    if (execution?.status === ExecutionState.SUCCESS) {
      stopPolling()
    }
  }, [execution?.status])

  const { data: logs } = useViewLogsQuery({
    pipeline_identifier: pipelineIdentifier,
    execution_number: executionNum,
    repo_ref: repoRef,
    stage_number: String(stageNum),
    step_number: String(stepNum)
  })

  useEffect(() => {
    if (execution?.stages && execution.stages.length > 0) {
      const stageIdx = stageNum > 0 ? stageNum - 1 : 0
      setStage(execution.stages[stageIdx])
    }
  }, [execution?.stages, stageNum])

  return (
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
  )
}

export const Execution: React.FC = () => {
  return <ExecutionLogs />
}
