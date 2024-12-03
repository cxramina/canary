import { FC } from 'react'

import { Button, DropdownMenu, DropdownMenuTrigger, Icon, Text } from '@/components'
import { TranslationStore } from '@/views'
import { cn } from '@utils/cn'

import { BranchSelectorDropdown, type BranchSelectorDropdownProps } from './branch-selector-dropdown'

interface BranchSelectorProps extends BranchSelectorDropdownProps {
  size?: 'default' | 'sm'
  prefix?: string
  className?: string
  useTranslationStore: () => TranslationStore
}

export const BranchSelector: FC<BranchSelectorProps> = ({
  selectedBranch,
  branchList,
  tagList,
  size = 'default',
  onSelectBranch,
  prefix,
  className,
  repoId,
  spaceId,
  useTranslationStore
}) => {
  const isTag = tagList.some(tag => tag.name === selectedBranch.name && tag.sha === selectedBranch.sha)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'data-[state=open]:border-borders-8 [&_svg]:data-[state=open]:text-foreground-1 flex items-center gap-1.5 overflow-hidden px-3',
            className
          )}
          variant="outline"
          size={size}
        >
          {!prefix && (
            <Icon className="shrink-0 fill-transparent text-icons-9" name={isTag ? 'tag' : 'branch'} size={12} />
          )}
          <Text className="w-full text-foreground-8" truncate align="left">
            {prefix ? `${prefix}: ${selectedBranch.name}` : selectedBranch.name}
          </Text>
          <Icon className="chevron-down text-icons-2" name="chevron-down" size={10} />
        </Button>
      </DropdownMenuTrigger>
      <BranchSelectorDropdown
        branchList={branchList}
        tagList={tagList}
        selectedBranch={selectedBranch}
        onSelectBranch={onSelectBranch}
        repoId={repoId}
        spaceId={spaceId}
        useTranslationStore={useTranslationStore}
      />
    </DropdownMenu>
  )
}
