import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, RootLayout } from '@harnessio/playground'
import { TooltipProvider } from '@harnessio/canary'
import { CodeServiceAPIClient } from '@harnessio/code-service-client'
import { queryClient } from './framework/queryClient'
import PipelineListPage from './pages/pipeline-list'
import SignInPage from './pages/signin'
import PullRequestListPage from './pages/pull-request-list-page'
import ReposListPage from './pages/repo-list'
import PullRequestLayout from './layouts/PullRequestLayout'
import PullRequestCommitsPage from './pages/pull-request-commits-page'
import RepoLayout from './layouts/RepoLayout'
import PipelineEditPage from './pages/pipeline-edit/pipeline-edit'
import { LandingPage } from './pages/landing-page'
import { AppProvider } from './framework/context/AppContext'
import CommitsListPage from './pages/commits-list-page'
import RepoExecutionListPage from './pages/repo-execution-list'

const BASE_URL_PREFIX = '/api/v1'

export default function App() {
  React.useEffect(() => {
    new CodeServiceAPIClient({
      urlInterceptor: (url: string) => `${BASE_URL_PREFIX}${url}`,
      requestInterceptor: (request: Request): Request => {
        // Retrieve the token from storage and add to headers if available
        const token = localStorage.getItem('token')
        if (token) {
          const newRequest = request.clone()
          newRequest.headers.set('Authorization', `Bearer ${token}`)
          return newRequest
        }
        return request
      },
      responseInterceptor: (response: Response) => {
        switch (response.status) {
          case 401:
            localStorage.removeItem('token')
            window.location.href = '/signin'
        }
        return response
      }
    })
  }, [])

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
              element: <>Summary</>
            },
            {
              path: 'pull-requests',
              element: <PullRequestListPage />
            },
            {
              path: 'pipelines',
              children: [
                {
                  index: true,
                  element: <PipelineListPage />
                },
                {
                  path: ':pipelineId',
                  element: <RepoExecutionListPage />
                }
              ]
            },
            {
              path: 'pipelines/:pipelineId',
              children: [
                {
                  index: true,
                  element: <RepoExecutionListPage />
                },
                {
                  path: 'executions',
                  element: <RepoExecutionListPage />
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
              element: <CommitsListPage />
            }
          ]
        },
        // Pipelines (OUTSIDE REPOS)
        {
          path: 'pipelines',
          element: <PipelineListPage />
        },
        // Executions (OUTSIDE REPOS) - TODO once api for all executions in workspace is available
        // {
        //   path: 'executions',
        //   element: <ExecutionsPage />
        // },
        {
          path: ':spaceId/:repoId',
          element: <RepoLayout />,
          children: [
            {
              index: true,
              element: <>Repos list</>
            },
            {
              path: 'pipelines/:pipelineId/edit',
              element: <PipelineEditPage />
            },
            {
              path: 'pipelines/:pipelineId/execution/:executionId',
              element: <div>Execution page</div>
            }
          ]
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
