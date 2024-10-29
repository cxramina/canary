import { Spacer } from '@harnessio/canary'
import { NoData, PullRequestCommits, SkeletonList } from '@harnessio/playground'
import { useListPullReqCommitsQuery, TypesCommit } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'

export default function PullRequestCommitsPage() {
  const repoRef = useGetRepoRef()
  const { data: { body: commitData } = {}, isFetching } = useListPullReqCommitsQuery({
    repo_ref: repoRef,
    pullreq_number: 1,
    queryParams: { page: 0, limit: 10 }
  })

  console.log()
  const renderContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    if (commitData?.length) {
      return (
        <PullRequestCommits
          data={commitData?.map((item: TypesCommit) => ({
            sha: item.sha,
            parent_shas: item.parent_shas,
            title: item.title,
            message: item.message,
            author: item.author,
            committer: item.committer
          }))}
        />
      )
    } else {
      return (
        <NoData
          iconName="no-data-folder"
          title="No commits yet"
          description={['There are no commits for this pull request yet.']}
        />
      )
    }
  }

  return (
    <>
      {renderContent()}
      <Spacer size={8} />
      {/* TODO: actually add pagination when apis are implemented */}
    </>
  )
}
