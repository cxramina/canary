import { NavLink } from 'react-router-dom'

import { Icon, ScrollArea, SearchBox, Sheet, SheetClose, SheetContent, SheetTitle, Spacer } from '@/components'
import NavbarSkeleton from '@/components/navbar/navbar-skeleton'
import { MenuGroupType } from '@components/navbar/types'

interface SystemAdminMenuProps {
  showSettingMenu: boolean
  handleSettingsMenu: () => void
  items: MenuGroupType[]
}

export const SettingsMenu = ({ showSettingMenu, handleSettingsMenu, items }: SystemAdminMenuProps) => {
  return (
    <Sheet modal={false} open={showSettingMenu}>
      <SheetContent
        className="inset-y-0 left-[220px] z-40 h-screen w-[364px] bg-transparent p-0"
        side="left"
        modal={false}
        hideCloseButton
      >
        <SheetTitle className="sr-only">System Administration menu</SheetTitle>
        <NavbarSkeleton.Root className="w-[364px]" isSubMenu>
          <NavbarSkeleton.Content className="overflow-hidden">
            <div className="h-[58px] px-5 flex justify-end items-center">
              <div
                className="h-full w-[55px] flex items-center justify-end group cursor-pointer"
                onClick={handleSettingsMenu}
              >
                <Icon name="close" size={16} className="text-foreground-4 group-hover:text-foreground-1" />
              </div>
            </div>
            <ScrollArea>
              <NavbarSkeleton.Group>
                <SearchBox.Root width="full" placeholder="Search all settings..."></SearchBox.Root>
                <Spacer size={1} />
              </NavbarSkeleton.Group>
              {items.map((group, group_idx) => (
                <NavbarSkeleton.Group
                  key={group.groupId}
                  topBorder={group_idx > 0}
                  title={group.title}
                  titleClassName="mb-1.5"
                >
                  <div className="grid grid-cols-2 gap-x-6 gap-y-[0.6875rem]">
                    {group.items.map(item => (
                      <NavLink key={item.id} to={item.to || ''} onClick={handleSettingsMenu}>
                        {({ isActive }) => (
                          <NavbarSkeleton.Item
                            text={item.title || ''}
                            icon={<Icon name={item.iconName} size={12} />}
                            active={isActive}
                          />
                        )}
                      </NavLink>
                    ))}
                  </div>
                </NavbarSkeleton.Group>
              ))}
              <Spacer size={11} />
            </ScrollArea>
          </NavbarSkeleton.Content>
        </NavbarSkeleton.Root>
      </SheetContent>
    </Sheet>
  )
}
