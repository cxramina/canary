import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, RootLayout } from '@harnessio/playground'
import { TooltipProvider } from '@harnessio/canary'
import { queryClient } from './framework/queryClient'
import PipelineListPage from './pages/pipeline-list'
import SignInPage from './pages/signin'
import PullRequestListPage from './pages/pull-request-list-page'
import ExecutionsListPage from './pages/execution-list'
import ReposListPage from './pages/repo/repo-list'
import PullRequestLayout from './layouts/PullRequestLayout'
import PullRequestCommitsPage from './pages/pull-request-commits-page'
import RepoLayout from './layouts/RepoLayout'
import PipelineEditPage from './pages/pipeline-edit/pipeline-edit'
import { LandingPage } from './pages/landing-page'
import { AppProvider } from './framework/context/AppContext'
import { RepoSummary } from './pages/repo/repo-summary'
import CreateProject from './pages/create-project'
import { PipelineCreate } from './pages/pipeline-create/pipeline-create'
import RepoCommitsPage from './pages/repo/repo-commits'
import RepoWebhooksListPage from './pages/repo/repo-webhooks'
import { ReposBranchesListPage } from './pages/repo/repo-branch-list'

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        {
          path: ':spaceId/repos',
          element: <ReposListPage />
        },
        {
          path: ':spaceId/repos/:repoId',
          element: <RepoLayout />,
          children: [
            {
              index: true,
              element: <RepoSummary />
            },
            {
              path: 'summary',
              element: <RepoSummary />
            },
            {
              path: 'pull-requests',
              element: <PullRequestListPage />
            },
            {
              path: 'pipelines',
              children: [
                { index: true, element: <PipelineListPage /> },
                {
                  path: ':pipelineId',
                  children: [
                    { index: true, element: <ExecutionsListPage /> },
                    {
                      path: 'edit',
                      element: <PipelineEditPage />
                    }
                  ]
                },
                {
                  path: 'create',
                  element: <PipelineCreate />
                }
              ]
            },
            {
              path: 'pull-requests/:pullRequestId',
              element: <PullRequestLayout />,
              children: [
                {
                  index: true,
                  element: <Navigate to="commits" />
                },
                {
                  path: 'commits',
                  element: <PullRequestCommitsPage />
                }
              ]
            },
            {
              path: 'commits',
              element: <RepoCommitsPage />
            },
            {
              path: 'branches',
              element: <ReposBranchesListPage />
            },
            { path: 'webhooks', element: <RepoWebhooksListPage /> }
          ]
        },
        {
          path: 'repos',
          element: <ReposListPage />
        },
        /* Pipelines (Outside a repo) */
        /**
         * 🚨 Root level pipelines will be disabled 🚨
         * Pipelines will only be part of a repository for now
         */
        {
          path: 'pipelines',
          element: <></>
        },
        /* Executions (Outside a repo) */
        {
          path: 'executions',
          element: <></>
        },
        {
          path: ':spaceId/:repoId',
          element: <RepoLayout />,
          children: [
            {
              index: true,
              element: <>Repos list</>
            },
            {
              path: 'pipelines',
              element: <PipelineListPage />
            },
            {
              path: 'pipelines/:pipelineId/edit',
              element: <PipelineEditPage />
            },
            {
              path: 'pipelines/create',
              element: <PipelineCreate />
            },
            {
              path: 'pipelines/:pipelineId/execution/:executionId',
              element: <div>Execution page</div>
            }
          ]
        },
        {
          path: 'create-project',
          element: <CreateProject />
        }
      ]
    },
    {
      path: '/signin',
      element: <SignInPage />
    }
  ])

  return (
    <AppProvider>
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
