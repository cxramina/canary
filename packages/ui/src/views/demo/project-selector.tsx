import { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@components/dropdown-menu'
import { Icon } from '@components/icon'
import { Text } from '@components/text'
import Avvvatars from 'avvvatars-react'

// Reusable Link Item Component
const ProjectLink: FC<{ name: string; to?: string }> = ({ name, to = '#' }) => (
  <Link to={to} className="flex gap-2.5 items-center text-foreground-5 px-3 py-1.5">
    <Avvvatars style="shape" size={20} shadow value={name} />
    <Text size={2}>{name}</Text>
  </Link>
)

// Section Component
const Section: FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="flex flex-col px-2.5 py-2">
    <Text size={1} className="opacity-60">
      {title}
    </Text>
    <div className="flex flex-col gap-3 py-2">
      {items.map(item => (
        <ProjectLink key={item} name={item} />
      ))}
    </div>
  </div>
)

// DemoTrigger Component
const DemoTrigger: FC = () => (
  <div className="group flex gap-2.5 items-center cursor-pointer">
    <Avvvatars style="shape" size={24} shadow value="Project Delight" />
    <Text size={2} className="text-foreground-4 group-hover:text-foreground-1">
      Project Delight
    </Text>
    <Icon name="chevron-down" size={12} className="group-hover:text-foreground-1" />
  </div>
)

// DemoManage Component
const DemoManage: FC = () => (
  <div className="flex flex-col px-2.5 py-2.5">
    <Button variant="outline" size="lg" className="px-3">
      Manage projects&nbsp;&nbsp;
      <Icon name="chevron-right" size={11} />
    </Button>
  </div>
)

// DemoProjectSelector Component
const DemoProjectSelector: FC = () => {
  const recentProjects = ['Project Surprise', 'Prototypes', 'User research tools']
  const favoriteProjects = ['Dev tools', 'MVP Components', 'Canary Icons']

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <DemoTrigger />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-[230px] bg-background-1" align="start">
        <DropdownMenuLabel className="text-foreground-3 font-normal">Recent projects</DropdownMenuLabel>
        {recentProjects.map((itm, itm_key) => (
          <Fragment key={itm_key}>
            <DropdownMenuItem className="[&_svg]:data-[highlighted]:text-icons-2" asChild>
              <ProjectLink name={itm} to="#" />
            </DropdownMenuItem>
          </Fragment>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-foreground-3 font-normal">Favorites</DropdownMenuLabel>
        {favoriteProjects.map((itm, itm_key) => (
          <Fragment key={itm_key}>
            <DropdownMenuItem className="[&_svg]:data-[highlighted]:text-icons-2" asChild>
              <ProjectLink name={itm} to="#" />
            </DropdownMenuItem>
          </Fragment>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="w-full flex gap-3 justify-between items-center pl-8">
            <Text size={2}>Manage projects</Text>
            <Icon name="chevron-right" size={11} />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DemoProjectSelector }
