import React, { useMemo } from 'react'
import { Icon, Text } from '@harnessio/canary'
import {
  CommentItem,
  EnumPullReqActivityType,
  orderSortDate,
  PayloadAuthor,
  PayloadCodeComment,
  PRCommentFilterType,
  TypesPullReq,
  TypesPullReqActivity
} from './interfaces'
import { isCodeComment, isComment, isSystemComment } from './utils'
import PullRequestTimelineItem from './pull-request-timeline-item'
import PullRequestSystemComments from './pull-request-system-comments'
import { orderBy } from 'lodash-es'
import PullRequestDiffViewer from './pull-request-diff-viewer'
import { useDiffConfig } from './hooks/useDiffConfig'
import { DiffModeEnum } from '@git-diff-view/react'

interface PullRequestOverviewProps {
  data: TypesPullReqActivity[]
  // data: CommentItem<TypesPullReqActivity>[][]
  pullReqMetadata: TypesPullReq
  activityFilter: { label: string; value: string }
  dateOrderSort: { label: string; value: string }
  diffData:
    | {
        oldFile?: {
          fileName?: string | null
          fileLang?: string | null
          content?: string | null
        }
        newFile?: {
          fileName?: string | null
          fileLang?: string | null
          content?: string | null
        }
        hunks: string[]
      }
    | undefined
}
export const activityToCommentItem = (activity: TypesPullReqActivity): CommentItem<TypesPullReqActivity> => ({
  id: activity.id || 0,
  author: activity.author?.display_name as string,
  created: activity.created as number,
  edited: activity.edited as number,
  updated: activity.updated as number,
  deleted: activity.deleted as number,
  outdated: !!activity.code_comment?.outdated,
  content: (activity.text || activity.payload?.message) as string,
  payload: activity
})

const PullRequestOverview: React.FC<PullRequestOverviewProps> = ({
  data,
  pullReqMetadata,
  activityFilter,
  dateOrderSort,
  diffData
}) => {
  const activityBlocks = useMemo(() => {
    // Each block may have one or more activities which are grouped into it. For example, one comment block
    // contains a parent comment and multiple replied comments
    const blocks: CommentItem<TypesPullReqActivity>[][] = []

    // Determine all parent activities
    const parentActivities = orderBy(
      data?.filter(activity => !activity.payload?.parent_id) || [],
      'created',
      dateOrderSort.value as orderSortDate
    ).map(_comment => [_comment])

    // Then add their children as follow-up elements (same array)
    parentActivities?.forEach(parentActivity => {
      const childActivities = data?.filter(activity => activity.payload?.parent_id === parentActivity[0].id)
      console.log(parentActivity[0].id, parentActivity, childActivities)

      childActivities?.forEach(childComment => {
        parentActivity.push(childComment)
      })
    })

    parentActivities?.forEach(parentActivity => {
      blocks.push(parentActivity.map(activityToCommentItem))
    })
    switch (activityFilter.value) {
      case PRCommentFilterType.ALL_COMMENTS:
        return blocks?.filter(_activities => !isSystemComment(_activities))

      case PRCommentFilterType.RESOLVED_COMMENTS:
        return blocks?.filter(
          _activities => _activities[0].payload?.resolved && (isCodeComment(_activities) || isComment(_activities))
        )

      case PRCommentFilterType.UNRESOLVED_COMMENTS:
        return blocks?.filter(
          _activities => !_activities[0].payload?.resolved && (isComment(_activities) || isCodeComment(_activities))
        )

      // case PRCommentFilterType.MY_COMMENTS: {
      //   const allCommentBlock = blocks?.filter(_activities => !isSystemComment(_activities))
      //   const userCommentsOnly = allCommentBlock?.filter(_activities => {
      //     const userCommentReply = _activities?.filter(
      //       authorIsUser => currentUser?.uid && authorIsUser.payload?.author?.uid === currentUser?.uid
      //     )
      //     return userCommentReply.length !== 0
      //   })
      //   return userCommentsOnly
      // }
    }

    return blocks
  }, [
    data,
    dateOrderSort,
    activityFilter
    // currentUser?.uid
  ])

  const renderedActivityBlocks = useMemo(() => {
    return (
      <div className="flex flex-col">
        <div>
          {activityBlocks?.map((commentItems, index) => {
            if (isSystemComment(commentItems)) {
              return (
                <PullRequestSystemComments
                  commentItems={commentItems}
                  isLast={data.length - 1 === index}
                  pullReqMetadata={pullReqMetadata}
                />
              )
            } else {
              const {
                // mode,
                // setMode,
                highlight,
                // setHighlight,
                wrap,
                //  setWrap,
                fontsize
              } = useDiffConfig()
              console.log(commentItems)
              const payload = commentItems[0]?.payload?.payload // Ensure payload is typed correctly
              if (payload?.type === ('code-comment' as EnumPullReqActivityType)) {
                return (
                  <PullRequestTimelineItem
                    key={index} // Consider using a unique ID if available
                    header={[
                      {
                        avatar: (
                          <>
                            <div className='h-6 w-6 rounded-full bg-tertiary-background bg-[url("../images/user-avatar.svg")] bg-cover'></div>
                          </>
                        ),
                        name: (payload?.author as PayloadAuthor)?.display_name,
                        // TODO: fix comment to tell between comment or code comment?
                        description: `commented 3 hours ago `
                      }
                    ]}
                    content={
                      <div className="flex flex-col  px-4 pt-4">
                        <div className="flex w-full justify-between">
                          <Text size={2} color="primary">
                            {(payload?.code_comment as PayloadCodeComment)?.path}
                          </Text>
                          <Text size={1} className="flex items-center gap-1" color={'tertiaryBackground'}>
                            Resolved
                            <Icon size={14} name="chevron-down" />
                          </Text>
                        </div>
                        <PullRequestDiffViewer
                          data={diffData}
                          fontsize={fontsize}
                          highlight={highlight}
                          mode={DiffModeEnum.Unified}
                          wrap={wrap}
                        />
                        <div className="px-1 py-2">
                          {commentItems?.map((commentItem, idx) => {
                            return (
                              <PullRequestTimelineItem
                                icon={
                                  <div className='h-6 w-6 rounded-full bg-tertiary-background bg-[url("../images/user-avatar.svg")] bg-cover'></div>
                                }
                                isLast={commentItems.length - 1 === idx}
                                header={[
                                  {
                                    name: (payload?.author as PayloadAuthor)?.display_name,
                                    // TODO: fix comment to tell between comment or code comment?
                                    description: `3 hours ago `
                                  }
                                ]}
                                hideReply
                                contentClassName="border-transparent"
                                content={
                                  <div className="flex py-1">
                                    <Text size={2} color="primary">
                                      {commentItem.payload?.payload?.text as string}
                                    </Text>
                                  </div>
                                }
                                key={`${commentItem.id}-${commentItem.author}-${idx}`}
                              />
                            )
                          })}
                        </div>
                      </div>
                      //
                    }
                    icon={<Icon name="chaos-engineering" size={14} />}
                    isLast={data.length - 1 === index}
                  />
                )
              }
              return (
                <PullRequestTimelineItem
                  key={index} // Consider using a unique ID if available
                  header={[
                    {
                      avatar: (
                        <>
                          <div className='h-6 w-6 rounded-full bg-tertiary-background bg-[url("../images/user-avatar.svg")] bg-cover'></div>
                        </>
                      ),
                      name: (payload?.author as PayloadAuthor)?.display_name,
                      // TODO: fix comment to tell between comment or code comment?
                      description: `commented 3 hours ago `
                    }
                  ]}
                  content={
                    <div className="px-4 pt-4">
                      {commentItems?.map((commentItem, idx) => {
                        return (
                          <PullRequestTimelineItem
                            icon={
                              <div className='h-6 w-6 rounded-full bg-tertiary-background bg-[url("../images/user-avatar.svg")] bg-cover'></div>
                            }
                            isLast={commentItems.length - 1 === idx}
                            header={[
                              {
                                name: (payload?.author as PayloadAuthor)?.display_name,
                                // TODO: fix comment to tell between comment or code comment?
                                description: ` 3 hours ago `
                              }
                            ]}
                            hideReply
                            contentClassName="border-transparent pb-0"
                            content={
                              <div className="flex py-1">
                                <Text size={2} color="primary">
                                  {commentItem.payload?.payload?.text as string}
                                </Text>
                              </div>
                            }
                            key={`${commentItem.id}-${commentItem.author}-${idx}`}
                          />
                        )
                      })}
                    </div>
                    //
                  }
                  icon={<Icon name="chaos-engineering" size={14} />}
                  isLast={data.length - 1 === index}
                />
              )
            }
          })}
        </div>
      </div>
    ) // [activityBlocks, currentUser, pullReqMetadata, activities]
  }, [data])

  return <div>{renderedActivityBlocks}</div>
}

export default PullRequestOverview
