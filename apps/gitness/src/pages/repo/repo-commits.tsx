import { parseAsInteger, useQueryState } from 'nuqs'
import { Spacer, Text } from '@harnessio/canary'
import {
  BranchSelector,
  Filter,
  NoData,
  PaddingListLayout,
  PaginationComponent,
  PullRequestCommits,
  SkeletonList
} from '@harnessio/playground'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'

import {
  TypesCommit,
  useFindRepositoryQuery,
  useListBranchesQuery,
  useListCommitsQuery
} from '@harnessio/code-service-client'
import { useEffect, useState } from 'react'
import { normalizeGitRef } from '../../utils/git-utils'
import { PageResponseHeader } from '../../types'

const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

export default function RepoCommitsPage() {
  const repoRef = useGetRepoRef()
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const { data: repository } = useFindRepositoryQuery({ repo_ref: repoRef })
  const { data, isFetching: isFetchingBranches } = useListBranchesQuery({
    repo_ref: repoRef,
    queryParams: { page }
  })

  const branches = data?.body

  const xNextPage = parseInt(data?.headers?.get(PageResponseHeader.xNextPage) || '')
  const xPrevPage = parseInt(data?.headers?.get(PageResponseHeader.xPrevPage) || '')

  const [selectedBranch, setSelectedBranch] = useState<string>('')

  const { data: commitData, isFetching: isFetchingCommits } = useListCommitsQuery({
    repo_ref: repoRef,

    queryParams: { page, git_ref: normalizeGitRef(selectedBranch), include_stats: true }
  })

  // 🚨 API not supporting sort, so waiting for API changes
  // const { sort } = useCommonFilter()

  // logic once we have dynamic pagination set up

  // const totalPages = useMemo(() => {
  //   if (!commitData || !commitData.total_commits) return 0
  //   return Math.ceil(commitData.total_commits / 10)
  // }, [commitData])

  useEffect(() => {
    if (repository?.body?.default_branch) {
      setSelectedBranch(repository.body.default_branch)
    }
  }, [repository?.body?.default_branch])

  const selectBranch = (branch: string) => {
    setSelectedBranch(branch)
  }
  const renderListContent = () => {
    if (isFetchingCommits) return <SkeletonList />

    // @ts-expect-error remove "@ts-expect-error" once CodeServiceClient Response for useListCommitsQuery is fixed
    const commitsLists = commitData?.body?.commits
    if (!commitsLists?.length) {
      return <NoData iconName="no-data-folder" title="No commits yet" description={['There are no commits yet.']} />
    }

    return (
      <PullRequestCommits
        data={commitsLists.map((item: TypesCommit) => ({
          sha: item.sha,
          parent_shas: item.parent_shas,
          title: item.title,
          message: item.message,
          author: item.author,
          committer: item.committer
        }))}
      />
    )
  }

  return (
    <PaddingListLayout spaceTop={false}>
      <Spacer size={2} />
      <Text size={5} weight={'medium'}>
        Commits
      </Text>
      <Spacer size={6} />
      <div className="flex justify-between gap-5">
        {!isFetchingBranches && branches && (
          <BranchSelector
            name={selectedBranch}
            branchList={branches.map(item => ({
              name: item.name || ''
            }))}
            selectBranch={(branch: string) => selectBranch(branch)}
          />
        )}

        <Filter showSearch={false} sortOptions={sortOptions} />
      </div>
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
