import { NavLink, Outlet } from 'react-router-dom'

import { SandboxLayout } from '..'

const RepoLayout: React.FC = () => {
  const baseClasses = 'h-full text-center flex items-center'

  const getLinkClasses = (isActive: boolean) =>
    `${baseClasses} ${isActive ? 'text-foreground-1 border-b border-foreground-1' : 'text-foreground-5 hover:text-foreground-1'}`

  return (
    <>
      <SandboxLayout.SubHeader>
        <div className="inline-flex h-[44px] w-full items-center justify-start gap-6 border-b border-borders px-8">
          <NavLink to="summary" className={({ isActive }) => getLinkClasses(isActive)}>
            Summary
          </NavLink>
          <NavLink to="code" className={({ isActive }) => getLinkClasses(isActive)}>
            Files
          </NavLink>
          <NavLink to="pipelines" className={({ isActive }) => getLinkClasses(isActive)}>
            Pipelines
          </NavLink>
          <NavLink to="commits" className={({ isActive }) => getLinkClasses(isActive)}>
            Commits
          </NavLink>
          <NavLink to="pulls" className={({ isActive }) => getLinkClasses(isActive)}>
            Pull Requests
          </NavLink>
          <NavLink to="webhooks" className={({ isActive }) => getLinkClasses(isActive)}>
            Webhooks
          </NavLink>
          <NavLink to="branches" className={({ isActive }) => getLinkClasses(isActive)}>
            Branches
          </NavLink>
          <NavLink to="settings" className={({ isActive }) => getLinkClasses(isActive)}>
            Settings
          </NavLink>
        </div>
      </SandboxLayout.SubHeader>
      <Outlet />
    </>
  )
}

export default RepoLayout
