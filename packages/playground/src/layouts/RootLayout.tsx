// RootLayout.tsx
import { Navbar, Icon, NavbarProjectChooser } from '@harnessio/canary'
import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'

const RootLayout: React.FC = () => {
  const location = useLocation()
  const hideNavbarPaths = ['/signin', '/signup']
  const showNavbar = !hideNavbarPaths.includes(location.pathname)

  const primaryMenuItems = [
    {
      text: 'Repositories',
      icon: <Icon name="archive" />,
      to: '/repos'
    },
    {
      text: 'Pipelines',
      icon: <Icon name="pipelines" />,
      to: '/pipelines'
    },
    {
      text: 'Executions',
      icon: <Icon name="executions" />,
      to: '/executions'
    },
    {
      text: 'Featured Flags',
      icon: <Icon name="featured-flags" />,
      to: '/feature-flags'
    }
  ]

  const pinnedMenuItems = [
    {
      text: 'Chaos Engineering',
      icon: <Icon name="chaos-engineering" />,
      to: '/chaos-engineering'
    },
    {
      text: 'Environment',
      icon: <Icon name="environment" />,
      to: 'environment'
    },
    {
      text: 'Secrets',
      icon: <Icon name="secrets" />,
      to: 'secrets'
    },
    {
      text: 'Connectors',
      icon: <Icon name="connectors" />,
      to: 'connectors'
    },
    {
      text: 'Home Page',
      icon: <Icon name="chaos-engineering" />,
      to: '/'
    },
    {
      text: 'Sign Up',
      icon: <Icon name="environment" />,
      to: '/signup'
    },
    {
      text: 'Sign In',
      icon: <Icon name="secrets" />,
      to: '/signin'
    }
  ]

  // const secondaryMenuItems = [
  //   {
  //     text: 'System Administration',
  //     icon: <SystemAdministrationIcon />
  //   }
  // ]

  const sampleProjectList = [
    {
      title: 'Playground',
      icon: <Icon name="archive" />
    },
    {
      title: 'Drone',
      icon: <Icon name="archive" />
    },
    {
      title: 'Pixel Point',
      icon: <Icon name="archive" />
    }
  ]

  return (
    <div className="bg-background flex">
      {showNavbar && (
        <Navbar.Root>
          <Navbar.Header>
            <NavbarProjectChooser.Root
              name="Playground"
              avatar={<Icon name="harness-logo" size={24} />}
              projects={sampleProjectList}
            />
          </Navbar.Header>
          <Navbar.Content>
            <Navbar.Group>
              {primaryMenuItems.map((item, idx) => (
                <NavLink key={idx} to={item.to || ''}>
                  {({ isActive }) => <Navbar.Item key={idx} text={item.text} icon={item.icon} active={isActive} />}
                </NavLink>
              ))}
              <Navbar.Item text="More" icon={<Icon name="ellipsis" />} />
            </Navbar.Group>
            <Navbar.AccordionGroup title="Pinned">
              {pinnedMenuItems.map((item, idx) => (
                <NavLink key={idx} to={item.to || ''}>
                  {({ isActive }) => <Navbar.Item key={idx} text={item.text} icon={item.icon} active={isActive} />}
                </NavLink>
              ))}
            </Navbar.AccordionGroup>
          </Navbar.Content>
          <Navbar.Footer>
            <p>Footer</p>
          </Navbar.Footer>
        </Navbar.Root>
      )}
      <main style={{ flexGrow: 1, padding: '0px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
