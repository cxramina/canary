import React, { useState, useEffect } from 'react'
import { Input } from './input'
import { Icon } from './icon'
import { Text } from './text'
import { cn } from '@/lib/utils'

enum TextSize {
  'text-[12px]' = 0,
  'text-xs' = 1,
  'text-sm' = 2,
  'text-base' = 3,
  'text-xl' = 4,
  'text-2xl' = 5,
  'text-3xl' = 6,
  'text-4xl' = 7,
  'text-5xl' = 8,
  'text-6xl' = 9,
  'text-7xl' = 10,
  'text-8xl' = 11,
  'text-9xl' = 12
}

interface SearchBoxProps {
  placeholder: string
  width?: 'full' | 'fixed'
  hasShortcut?: boolean
  shortcutLetter?: string
  textSize?: TextSize
  onSearch?: () => void
  showOnFocus?: boolean // New prop to control dialog appearance on focus
}

function Root({
  textSize = TextSize['text-sm'],
  placeholder,
  width = 'fixed',
  hasShortcut = false,
  shortcutLetter,
  onSearch,
  showOnFocus = false // Default to false
}: SearchBoxProps) {
  const [isFocused, setIsFocused] = useState(false)
  const textSizeClass = TextSize[textSize]

  const handleSearch = () => {
    if (onSearch) {
      onSearch()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleFocus = () => {
    if (showOnFocus) {
      setIsFocused(true)
      handleSearch()
    }
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  useEffect(() => {
    const handleShortcutKey = (e: KeyboardEvent) => {
      if (hasShortcut && shortcutLetter && e.key.toLowerCase() === shortcutLetter.toLowerCase()) {
        handleSearch()
      }
    }
    window.addEventListener('keydown', handleShortcutKey)

    return () => {
      window.removeEventListener('keydown', handleShortcutKey)
    }
  }, [hasShortcut, shortcutLetter, handleSearch])

  return (
    <div className={cn('relative', width === 'full' ? 'w-full' : 'w-96')}>
      <Icon
        name="search"
        size={12}
        className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-tertiary-background"
      />
      {hasShortcut && (
        <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-tertiary-background flex gap-0.5 items-center shadow-border shadow-[0_0_0_1px] rounded-md px-1 opacity-80 hover:opacity-100 ease-in-out duration-100 cursor-pointer">
          <Icon name="apple-shortcut" size={12} />
          <Text size={0} color="tertiaryBackground">
            {shortcutLetter}
          </Text>
        </div>
      )}
      <Input
        placeholder={placeholder}
        className={cn('border-input-foreground pl-7', textSizeClass, { 'pr-10': hasShortcut })}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {/* Optionally show a dialog or some indication of focus */}
      {showOnFocus && isFocused && (
        <div className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-md p-4">
          {/* Replace this with your actual dialog component */}
          <p>Search dialog</p>
        </div>
      )}
    </div>
  )
}

export { Root }
