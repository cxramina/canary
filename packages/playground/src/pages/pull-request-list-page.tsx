import React, { useState } from 'react'
import {
  Spacer,
  ListActions,
  ListPagination,
  SearchBox,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  Button
} from '@harnessio/canary'
import { Link } from 'react-router-dom'
import PaddingListLayout from '../layouts/PaddingListLayout'
import PullRequestList from '../components/pull-request/pull-request-list'
import SkeletonList from '../components/loaders/skeleton-list'
import NoSearchResults from '../components/no-search-results'
import NoDataState from '../components/no-list-data'
import PlaygroundListSettings from '../components/playground/list-settings'

// This data is temporary, since Calvin already built a more comprehensive set of mock data. Using this for speed to require less refactoring of the typical stacked list component, however we should get thge original data back in
const mockPullRequests = [
  {
    id: '1',
    number: 14282,
    merged: true,
    name: '[framework-fixtures]: Bump the core group',
    sha: '93dbd09a',
    reviewRequired: true,
    tasks: 3,
    author: 'fgarson',
    version: 'v1.5.4.20',
    timestamp: '1 hour ago',
    comments: 4,
    labels: [
      {
        text: 'feature',
        color: 'mint'
      },
      {
        text: 'bug',
        color: 'red'
      },
      {
        text: 'community',
        color: 'blue'
      }
    ]
  },
  {
    id: '2',
    number: 14283,
    merged: false,
    name: 'Test PPR RSC encoding fix',
    sha: '366177a6',
    reviewRequired: true,
    tasks: 3,
    author: 'brydzewski',
    version: 'v1.54.19',
    timestamp: '2 hours ago',
    comments: 1,
    labels: [
      {
        text: 'feature',
        color: 'mint'
      },
      {
        text: 'medium priority',
        color: 'yellow'
      }
    ]
  },
  {
    id: '3',
    number: 14284,
    merged: true,
    name: '[cli] implements vc deploy --logs and vc inspect --logs',
    sha: 'da7c1c67',
    reviewRequired: false,
    tasks: 3,
    author: 'fgarson',
    version: 'v1.5.4.20',
    timestamp: '2 hours ago',
    comments: 2,
    labels: [
      {
        text: 'feature',
        color: 'mint'
      },
      {
        text: 'platform',
        color: 'purple'
      }
    ]
  },
  {
    id: '4',
    number: 14285,
    merged: true,
    name: '[framework-fixtures]: Bump the core group',
    sha: '93dbd09a',
    reviewRequired: false,
    tasks: 2,
    author: 'fgarson',
    version: 'v1.5.4.20',
    timestamp: '7 months ago',
    comments: 3,
    labels: [
      {
        text: 'bug',
        color: 'red'
      },
      {
        text: 'community',
        color: 'blue'
      },
      {
        text: 'medium priority',
        color: 'yellow'
      }
    ]
  },

  {
    id: '5',
    number: 14286,
    merged: false,
    name: 'Test PPR RSC encoding fixAdd support for jpath in jsonnet (#224) * Add support for jpath in jsonnet Co-a',
    sha: 'fe54f9b1',
    reviewRequired: true,
    tasks: 3,
    author: 'vbansal',
    version: 'v0.20.0',
    timestamp: '7 months ago',
    comments: 1,
    labels: [
      {
        text: 'feature',
        color: 'mint'
      },
      {
        text: 'medium priority',
        color: 'yellow'
      }
    ]
  },
  {
    id: '6',
    number: 14287,
    merged: true,
    name: 'fix: u[cli] implements vc deploy --logs and vc inspect --logsse right parameter name for secrets-file',
    sha: 'b7765ad1',
    reviewRequired: true,
    tasks: 3,
    author: 'arostogi',
    version: 'v0.20.0',
    timestamp: '10 months ago',
    comments: 4,
    labels: [
      {
        text: 'feature',
        color: 'mint'
      },
      {
        text: 'bug',
        color: 'red'
      },
      {
        text: 'community',
        color: 'blue'
      }
    ]
  }
]

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

function PullRequestListPage() {
  const [listState, setListState] = useState('data-loaded')

  const renderListContent = () => {
    switch (listState) {
      case 'data-loaded':
        return <PullRequestList pullRequests={mockPullRequests} />
      case 'loading':
        return <SkeletonList />
      case 'no-search-matches':
        return (
          <NoSearchResults
            iconName="no-search-magnifying-glass"
            title="No search results"
            description={['Check your spelling and filter options,', 'or search for a different keyword.']}
            primaryButtonLabel="Clear search"
            secondaryButtonLabel="Clear filters"
          />
        )
      default:
        return null
    }
  }

  if (listState == 'no-data') {
    return (
      <NoDataState
        insideTabView
        listState={listState}
        setListState={setListState}
        iconName="no-data-merge"
        title="No Pull Requests yet"
        description={['There are no pull requests in this repository yet.']}
      />
    )
  }

  return (
    <>
      <PaddingListLayout spaceTop={false}>
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search" />
          </ListActions.Left>
          <ListActions.Right>
            <ListActions.Dropdown title="Filter" items={filterOptions} />
            <ListActions.Dropdown title="Sort" items={sortOptions} />
            <Button variant="default" asChild>
              <Link to="edit">Create Pull Request</Link>
            </Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderListContent()}
        <Spacer size={8} />
        {listState == 'data-loaded' && (
          <ListPagination.Root>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious size="sm" href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive size="sm_icon" href="#">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink size="sm_icon" href="#">
                    2
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink size="sm_icon" href="#">
                    <PaginationEllipsis />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink size="sm_icon" href="#">
                    4
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink size="sm_icon" href="#">
                    5
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext size="sm" href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ListPagination.Root>
        )}
      </PaddingListLayout>
      <PlaygroundListSettings listState={listState} setListState={setListState} />
    </>
  )
}

export default PullRequestListPage
