import { Link, useParams } from 'react-router-dom'
import { Button, Spacer, Text } from '@harnessio/canary'
import { useListPipelinesQuery, TypesPipeline } from '@harnessio/code-service-client'
import {
  PipelineList,
  MeterState,
  PaddingListLayout,
  SkeletonList,
  Filter,
  useCommonFilter,
  NoData,
  NoSearchResults
} from '@harnessio/playground'
import { ExecutionState } from '../types'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { PageControls } from '../components/Pagination'
import { PathParams } from '../RouteDefinitions'

export default function PipelinesPage() {
  const { spaceId, repoId } = useParams<PathParams>()
  const repoRef = useGetRepoRef()

  const { query } = useCommonFilter()

  const { data: pipelines, isFetching } = useListPipelinesQuery(
    {
      repo_ref: repoRef,
      queryParams: { page: 0, limit: 10, query: query?.trim(), latest: true }
    },
    /* To enable mock data */
    {
      enabled: true
    }
  )

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

  const renderListContent = () => {
    if (isFetching) return <SkeletonList />

    if (!pipelines?.content?.length) {
      if (query) {
        return (
          <NoSearchResults
            iconName="no-search-magnifying-glass"
            title="No search results"
            description={['Check your spelling and filter options,', 'or search for a different keyword.']}
            primaryButton={{ label: 'Clear search' }}
            secondaryButton={{ label: 'Clear filters' }}
          />
        )
      }
      return (
        <NoData
          iconName="no-data-folder"
          title="No pipelines yet"
          description={['There are no pipelines in this repository yet.']}
          primaryButton={{ label: 'Create pipeline', to: `/${spaceId}/repos/${repoId}/pipelines/create` }}
        />
      )
    }

    return (
      <PipelineList
        pipelines={pipelines?.content?.map((item: TypesPipeline) => ({
          id: item?.identifier,
          status: item?.execution?.status,
          name: item?.identifier,
          sha: item?.execution?.after,
          description: item?.execution?.message,
          timestamp: item?.created,
          meter: [
            {
              id: item?.execution?.number,
              state: item?.execution?.status === ExecutionState.SUCCESS ? MeterState.Success : MeterState.Error
            }
          ]
        }))}
        LinkComponent={LinkComponent}
      />
    )
  }

  const pipelinesExist = (pipelines?.content?.length ?? 0) > 0

  return (
    <>
      <PaddingListLayout spaceTop={false}>
        <Spacer size={2} />
        {/**
         * Show if pipelines exist.
         * Additionally, show if query(search) is applied.
         */}
        {(query || pipelinesExist) && (
          <>
            <Text size={5} weight={'medium'}>
              Pipelines
            </Text>
            <Spacer size={6} />
            <div className="flex justify-between gap-5">
              <div className="flex-1">
                <Filter />
              </div>
              <Button variant="default" asChild>
                <Link to="create">Create Pipeline</Link>
              </Button>
            </div>
          </>
        )}
        <Spacer size={5} />
        {renderListContent()}
        <Spacer size={8} />
        {pipelinesExist && <PageControls totalPages={pipelines?.headers?.['total']} />}
      </PaddingListLayout>
    </>
  )
}
