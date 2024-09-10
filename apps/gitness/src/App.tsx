import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, RootLayout } from '@harnessio/playground'
import { CodeServiceAPIClient } from '@harnessio/code-service-client'
import { queryClient } from './framework/queryClient'
import PipelineListPage from './pages/pipeline-list'
import SignInPage from './pages/signin'

const BASE_URL_PREFIX = '/api/v1'

export default function App() {
  // const navigate = useNavigate()
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
        {
          path: 'pipelines',
          element: <PipelineListPage />
        }
      ]
    },
    {
      path: '/signin',
      element: <SignInPage />
    }
  ])

  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
