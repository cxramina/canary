import React from 'react'
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
  return (
    //Wrapper component for padding and list layout-Jessie
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
      <PullRequestList pullRequests={mockPullRequests} />
      <Spacer size={8} />
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
    </PaddingListLayout>
  )
}

export default PullRequestListPage
