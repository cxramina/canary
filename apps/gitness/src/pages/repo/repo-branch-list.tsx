import { useEffect } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Link, useParams } from 'react-router-dom'
import { SkeletonList, NoData, PaddingListLayout, BranchesList, Filter, useCommonFilter } from '@harnessio/playground'
import { Button, Spacer, Text } from '@harnessio/canary'
import {
  useListBranchesQuery,
  RepoBranch,
  useCalculateCommitDivergenceMutation,
  useFindRepositoryQuery,
  ListBranchesQueryQueryParams
} from '@harnessio/code-service-client'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { PageResponseHeader, orderSortDate } from '../../types'
import { timeAgoFromISOTime } from '../pipeline-edit/utils/time-utils'
import { NoSearchResults, PaginationComponent } from '../../../../../packages/playground/dist'
import { PathParams } from '../../RouteDefinitions'

const sortOptions = [
  { name: 'Date', value: 'date' },
  { name: 'Name', value: 'name' }
]

export function ReposBranchesListPage() {
  const repoRef = useGetRepoRef()
  const { spaceId, repoId } = useParams<PathParams>()

  const { data: repoMetadata } = useFindRepositoryQuery({ repo_ref: repoRef })

  const { query: currentQuery, sort } = useCommonFilter<ListBranchesQueryQueryParams['sort']>()

  const [query, _] = useQueryState('query', { defaultValue: currentQuery || '' })
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const { isLoading, data } = useListBranchesQuery({
    queryParams: { page, sort, query, order: orderSortDate.DESC, include_commit: true },
    repo_ref: repoRef
  })

  const branches = data?.body

  const xNextPage = parseInt(data?.headers?.get(PageResponseHeader.xNextPage) || '')
  const xPrevPage = parseInt(data?.headers?.get(PageResponseHeader.xPrevPage) || '')

  const { data: branchDivergence, mutate } = useCalculateCommitDivergenceMutation({
    repo_ref: repoRef
  })

  useEffect(() => {
    if (branches?.length !== 0 && branches !== undefined) {
      mutate({
        body: {
          requests: branches?.map(branch => ({ from: branch.name, to: repoMetadata?.body?.default_branch })) || []
        }
      })
    }
  }, [mutate, branches, repoMetadata?.body?.default_branch])

  const renderListContent = () => {
    if (isLoading) return <SkeletonList />

    if (!branches?.length) {
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
          iconName="no-data-branches"
          title="No branches yet"
          description={[
            "Your branches will appear here once they're created.",
            'Start branching to see your work organized.'
          ]}
          primaryButton={{ label: 'Create new branch' }}
        />
      )
    }

    //get the data arr from behindAhead
    const behindAhead =
      branchDivergence?.body?.map(divergence => {
        return {
          behind: divergence.behind,
          ahead: divergence.ahead
        }
      }) || []

    return (
      <BranchesList
        defaultBranch={repoMetadata?.body?.default_branch}
        repoId={repoId}
        spaceId={spaceId}
        branches={branches?.map((branch: RepoBranch, index) => {
          const { ahead: branchAhead, behind: branchBehind } = behindAhead[index] || {}
          return {
            id: index,
            name: branch.name || '',
            sha: branch.commit?.sha || '',
            timestamp: branch.commit?.committer?.when ? timeAgoFromISOTime(branch.commit.committer.when) : '',
            user: {
              name: branch.commit?.committer?.identity?.name || '',
              avatarUrl: ''
            },
            behindAhead: {
              behind: branchBehind || 0,
              ahead: branchAhead || 0,
              default: repoMetadata?.body?.default_branch === branch.name
            }
          }
        })}
      />
    )
  }

  const branchesExist = (branches?.length ?? 0) > 0

  return (
    <PaddingListLayout spaceTop={false}>
      <Spacer size={2} />
      {/**
       * Show if branches exist.
       * Additionally, show if query(search) is applied.
       */}
      {(query || branchesExist) && (
        <>
          <Text size={5} weight={'medium'}>
            Branches
          </Text>
          <Spacer size={6} />
          <div className="flex justify-between gap-5 items-center">
            <div className="flex-1">
              <Filter sortOptions={sortOptions} />
            </div>
            <Button variant="default" asChild>
              <Link to="create">Create Branch</Link>
            </Button>
          </div>
        </>
      )}
      <Spacer size={5} />
      {renderListContent()}
      <Spacer size={8} />
      {(!isNaN(xNextPage) || !isNaN(xPrevPage)) && (
        <PaginationComponent
          nextPage={xNextPage}
          previousPage={xPrevPage}
          currentPage={page}
          goToPage={(pageNum: number) => setPage(pageNum)}
        />
      )}
    </PaddingListLayout>
  )
}
