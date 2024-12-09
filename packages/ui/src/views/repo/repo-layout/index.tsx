import { useMemo } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import { Tabs, TabsList, TabsTrigger } from '@/components'
import { SandboxLayout, TranslationStore } from '@/views'
import { DemoTopBar } from '@views/demo/top-bar'

export enum RepoTabsKeys {
  SUMMARY = 'summary',
  CODE = 'code',
  PIPELINES = 'pipelines',
  COMMITS = 'commits',
  PULLS = 'pull Requests',
  WEBHOOKS = 'webhooks',
  BRANCHES = 'branches',
  SETTINGS = 'settings'
}

export const repoTabsKeysArr = Object.values(RepoTabsKeys)

export const RepoLayout = ({ useTranslationStore }: { useTranslationStore: () => TranslationStore }) => {
  const location = useLocation()
  const { t } = useTranslationStore()
  const baseClasses = 'h-full text-center flex items-center'

  const activeTab = useMemo(() => {
    const tab = repoTabsKeysArr.find(key => location.pathname.includes(key))
    return tab ?? RepoTabsKeys.SUMMARY
  }, [location.pathname])

  const getLinkClasses = (isActive: boolean) => {
    return `${baseClasses} ${isActive ? 'text-foreground-1 border-b border-foreground-5' : 'text-foreground-6 hover:text-foreground-1'}`
  }

  return (
    <>
      <SandboxLayout.Header>
        <DemoTopBar />
      </SandboxLayout.Header>
      <SandboxLayout.SubHeader className="overflow-hidden">
        <Tabs variant="navigation" value={activeTab}>
          <TabsList>
            {repoTabsKeysArr.map(key => (
              <NavLink key={key} to={key} className={({ isActive }) => getLinkClasses(isActive)}>
                <TabsTrigger value={key}>
                  {t(`views:repos.${key}`, key.charAt(0).toUpperCase() + key.slice(1))}
                </TabsTrigger>
              </NavLink>
            ))}
          </TabsList>
        </Tabs>
      </SandboxLayout.SubHeader>
      <Outlet />
    </>
  )
}
