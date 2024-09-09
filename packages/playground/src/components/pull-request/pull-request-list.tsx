import { Badge, cn, Icon, StackedList, Text } from '@harnessio/canary'
import React, { useMemo, useState } from 'react'
import cx from 'classnames'

interface PullRequestProps {
  id: string
  merged: boolean
  name: string
  number?: number
  sha?: string
  author?: string
  reviewRequired?: boolean
  tasks?: number
  version?: string
  timestamp: string
  comments: number
  labels?: {
    text: string
    color: string
  }[]
}

interface PageProps {
  pullRequests?: PullRequestProps[]
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode }>
}

const HeaderTitle = ({
  setHeaderFilter,
  headerFilter
}: {
  setHeaderFilter: (state: string) => void
  headerFilter: string
}) => {
  return (
    <div className="flex gap-4 items-center">
      <div
        onClick={() => setHeaderFilter('open')}
        className={cx('flex gap-2 items-center', {
          'text-white': headerFilter === 'open',
          'text-tertiary-background': headerFilter !== 'open'
        })}>
        <Icon size={16} name="merged" />
        <Text size={2} truncate>
          122 Open
        </Text>
      </div>
      <div
        onClick={() => setHeaderFilter('closed')}
        className={cx('flex gap-2 items-center', {
          'text-white': headerFilter === 'closed',
          'text-tertiary-background': headerFilter !== 'closed'
        })}>
        <Icon size={12} name="tick" />
        <Text size={2} truncate>
          8,128 Closed
        </Text>
      </div>
    </div>
  )
}

const colorMapping: { [key: string]: { border: string; text: string; bg: string } } = {
  mint: { border: 'border-emerald-400/20', text: 'text-emerald-300', bg: 'bg-emerald-400/10' },
  yellow: { border: 'border-orange-400/20', text: 'text-orange-400', bg: 'bg-orange-400/10' },
  red: { border: 'border-red-400/20', text: 'text-red-400', bg: 'bg-red-400/10' },
  blue: { border: 'border-blue-400/20', text: 'text-blue-300', bg: 'bg-blue-400/10' },
  purple: { border: 'border-purple-400/20', text: 'text-purple-300', bg: 'bg-purple-400/10' }
}

const Title = ({
  success,
  title,
  labels
}: {
  success: boolean
  title: string
  labels: { text: string; color: string }[]
}) => {
  return (
    <div className="flex gap-2 items-center">
      {typeof success === 'boolean' ? (
        <Icon size={16} name={success ? 'merged' : 'unmerged'} />
      ) : (
        <div className="w-4 h-4 rounded-full bg-primary/5 border border-muted border-dotted" />
      )}
      <Text size={2} truncate>
        {title}
      </Text>
      {labels &&
        labels.map((l, l_idx) => {
          const { border, text, bg } = colorMapping[l.color] || { border: '', text: '' }
          return (
            <Badge
              key={l_idx}
              variant="outline"
              size={'sm'}
              className={cn('rounded-full text-[12px] font-normal', border, text, bg)}>
              <p className="truncate">{l.text}</p>
            </Badge>
          )
        })}
    </div>
  )
}

const Description = ({
  reviewRequired,
  number,
  tasks,
  author,
  version,
  timestamp
}: {
  number?: number
  reviewRequired?: boolean
  tasks?: number
  author?: string
  version?: string
  timestamp?: string
}) => {
  return (
    <div className="pl-[24px] inline-flex gap-2 items-center max-w-full overflow-hidden">
      {number && <div className="flex gap-1 items-center ">#{number}</div>}
      {author && timestamp && (
        <Text size={1} color="tertiaryBackground">
          opened {timestamp} by {author}
        </Text>
      )}
      {typeof reviewRequired === 'boolean' && (
        <Text size={1} color="tertiaryBackground">
          {reviewRequired ? 'Review required' : 'Draft'}
        </Text>
      )}
      {typeof tasks !== 'undefined' && tasks > 0 && (
        <div className="flex gap-1 items-center">
          <Icon size={11} name={'tasks'} />
          <Text size={1} color="tertiaryBackground">
            {tasks} task{tasks === 1 ? '' : 's'}
          </Text>
        </div>
      )}
      {version && (
        <div className="flex gap-1 items-center">
          <Icon size={11} name={'signpost'} />
          <Text size={1} color="tertiaryBackground">
            {version}
          </Text>
        </div>
      )}
    </div>
  )
}

const Comments = ({ comments }: { comments: number }) => {
  return (
    <div className="flex gap-1.5 items-center">
      <Icon size={16} name={'comments'} />
      <Text size={1} className="text-primary">
        {comments}
      </Text>
    </div>
  )
}

export default function PullRequestList({ pullRequests, LinkComponent }: PageProps) {
  const [headerFilter, setHeaderFilter] = useState('open')
  const filteredData = useMemo(
    () =>
      pullRequests?.filter(pr => {
        if (headerFilter === 'open') return !pr.merged
        if (headerFilter === 'closed') return pr.merged
        return true
      }),
    [headerFilter]
  )

  return (
    <>
      {filteredData && filteredData.length > 0 && (
        <StackedList.Root>
          <StackedList.Item isHeader disableHover>
            <StackedList.Field
              title={<HeaderTitle headerFilter={headerFilter} setHeaderFilter={setHeaderFilter} />}></StackedList.Field>
          </StackedList.Item>
          {filteredData?.map((pullRequest, pullRequest_idx) => (
            <LinkComponent to={pullRequest.id}>
              <StackedList.Item
                key={`${pullRequest.name}-${pullRequest_idx}`}
                isLast={filteredData.length - 1 === pullRequest_idx}>
                <StackedList.Field
                  title={
                    <Title success={pullRequest.merged} title={pullRequest.name} labels={pullRequest.labels || []} />
                  }
                  description={
                    <Description
                      number={pullRequest.number || 123}
                      author={pullRequest.author}
                      reviewRequired={pullRequest.reviewRequired}
                      tasks={pullRequest.tasks}
                      version={pullRequest.version || ''}
                      timestamp={pullRequest.timestamp || '1 hour ago'}
                    />
                  }
                />
                <StackedList.Field title={<Comments comments={pullRequest.comments} />} right label secondary />
              </StackedList.Item>
            </LinkComponent>
          ))}
        </StackedList.Root>
      )}
      {!pullRequests && (
        <></> // Handle loading/no items
      )}
    </>
  )
}
