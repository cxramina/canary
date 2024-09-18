import React, { useState } from 'react'
import PlaygroundPullRequestChangesSettings from '../settings/pull-request-changes-settings'
import { SkeletonList } from '../components/loaders/skeleton-list'
import { NoData } from '../components/no-data'
import {
  ListActions,
  Spacer,
  Text,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  Icon,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  RadioGroupItem,
  RadioGroup
} from '@harnessio/canary'
import * as data from '../data/mockDiffViewerdata'
import PullRequestChanges from '../components/pull-request/pull-request-changes'
import { Gauge } from '..'

interface FilterViewProps {
  active: string
}

const mockApprovalItems = [
  {
    stateId: 0,
    state: 'success',
    title: 'Approve',
    items: [
      {
        id: 0,
        title: 'This is a title',
        description: 'This is a description'
      },
      {
        id: 1,
        title: 'This is title 2',
        description: 'This is description 2'
      },
      {
        id: 2,
        title: 'This is title 3',
        description: 'This is description 3'
      }
    ]
  },
  {
    stateId: 1,
    state: 'warning',
    title: 'Approve',
    items: [
      { id: 0, title: 'This is a title', description: 'This is a description' },
      {
        id: 1,
        title: 'This is title 2',
        description: 'This is description 2'
      },
      {
        id: 2,
        title: 'This is title 3',
        description: 'This is description 3'
      }
    ]
  },
  {
    stateId: 2,
    state: 'error',
    title: 'Approve',
    items: [
      {
        id: 0,
        title: 'This is a title',
        description: 'This is a description'
      },
      {
        id: 1,
        title: 'This is title 2',
        description: 'This is description 2'
      },
      {
        id: 2,
        title: 'This is title 3',
        description: 'This is description 3'
      }
    ]
  }
]

const FilterSortViewDropdowns: React.FC<FilterViewProps> = ({ active }) => {
  const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
  const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
  const viewOptions = [{ name: 'View option 1' }, { name: 'View option 2' }]

  const index = (() => {
    switch (active) {
      case 'data-loaded-warning':
        return 1
      case 'data-loaded-error':
        return 2
      default:
        return 0
    }
  })()

  return (
    <ListActions.Root>
      <ListActions.Left>
        <ListActions.Dropdown title="All commits" items={filterOptions} />
        <ListActions.Dropdown title="File filter" items={sortOptions} />
        <ListActions.Dropdown title="View" items={viewOptions} />
      </ListActions.Left>
      <ListActions.Right>
        <Gauge.Root>
          <Gauge.Content>1 / 3 files viewed</Gauge.Content>
          <Gauge.Bar total={10} filled={3} />
        </Gauge.Root>
        <Button
          variant="split"
          size="xs_split"
          theme={mockApprovalItems[index].state}
          dropdown={
            <DropdownMenu>
              <DropdownMenuTrigger insideSplitButton>
                <Icon name="chevron-down" size={11} className="chevron-down" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-1">
                <DropdownMenuGroup>
                  {mockApprovalItems &&
                    mockApprovalItems[0].items.map(itm => {
                      return (
                        <DropdownMenuItem key={itm.id}>
                          <RadioGroup className="flex items-start gap-2">
                            <RadioGroupItem value="false" className="w-3 h-3 text-tertiary-background mt-1" />
                            <div className="flex flex-col">
                              <Text truncate size={1} color="primary">
                                {itm.title}
                              </Text>
                              <Text size={1} color="tertiaryBackground">
                                {itm.description}
                              </Text>
                            </div>
                          </RadioGroup>
                        </DropdownMenuItem>
                      )
                    })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          }>
          {mockApprovalItems[index].title}
        </Button>
      </ListActions.Right>
    </ListActions.Root>
  )
}

export default function PullRequestChangesPage() {
  const [loadState, setLoadState] = useState('data-loaded-success') // Change to data-loaded when component work is finished

  const pullRequestData = [
    'All checks have succeeded',
    'New commit pushed',
    'Conflicts resolved',
    'All checks have succeeded',
    'New commit pushed',
    'Conflicts resolved',
    'All checks have succeeded',
    'New commit pushed',
    'Conflicts resolved'
  ]

  const renderContent = () => {
    switch (loadState) {
      case 'data-loaded-success':
      case 'data-loaded-warning':
      case 'data-loaded-error':
        return <PullRequestChanges data={pullRequestData} diffData={data['b']} />
      case 'loading':
        return <SkeletonList />
      case 'no-data':
        return (
          <NoData
            iconName="no-data-folder"
            title="No changes yet"
            description={['There are no changes for this pull request yet.']}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      {loadState.startsWith('data-loaded-') && (
        <>
          <FilterSortViewDropdowns active={loadState} />
          <Spacer aria-setsize={5} />
        </>
      )}
      {renderContent()}
      <PlaygroundPullRequestChangesSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )

  return null
}
