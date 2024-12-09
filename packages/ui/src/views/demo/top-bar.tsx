import { FC } from 'react'
import { useParams } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@components/breadcrumb'

import { DemoProjectSelector } from './project-selector'

const DemoTopBar: FC = () => {
  const params = useParams()
  const { repoId } = params

  return (
    <Breadcrumb className="h-full flex items-center px-6 border-b border-borders-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <DemoProjectSelector />
        </BreadcrumbItem>
        {repoId && (
          <>
            <BreadcrumbSeparator>&nbsp;/&nbsp;</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/new-ux/repos">Repositories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>&nbsp;/&nbsp;</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{repoId}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { DemoTopBar }
