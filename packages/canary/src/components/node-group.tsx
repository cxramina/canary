import React from 'react'
import { cn } from '@/lib/utils'

interface NodeGroupRootProps {
  className?: string
  children: React.ReactNode
}

function Root({ className, children }: NodeGroupRootProps) {
  return (
    <div
      className={cn(
        'relative grid items-center grid-cols-[26px_1fr] grid-rows-[auto_1fr] gap-x-3 gap-y-2 pb-8',
        className
      )}>
      {children}
    </div>
  )
}

function Icon({
  children,
  simpleNodeIcon,
  className
}: {
  children?: React.ReactNode
  simpleNodeIcon?: boolean
  className?: string
}) {
  return (
    <div className="col-start-1 row-start-1 self-start">
      <div
        className={cn(
          'relative z-20 h-6 w-6 rounded-full flex place-content-center place-items-center p-1 border border-tertiary-background/30 bg-background text-primary',
          { 'border-none bg-transprent': simpleNodeIcon },
          className
        )}>
        {simpleNodeIcon ? (
          <div className="bg-primary shadow-primary/10 size-[4px] rounded-[1px] shadow-sm" />
        ) : (
          <>{children}</>
        )}
      </div>
    </div>
  )
}

function Title({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="col-start-2 row-start-1">
      <div className={cn('inline-flex gap-1.5 items-center', className)}>{children}</div>
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="col-start-2 row-start-2">{children}</div>
}

function Connector({ first, last }: { first?: boolean; last?: boolean }) {
  return (
    <div
      className={cn(
        'z-10 absolute left-[12px] top-0 bottom-0 w-[1px] border-l',
        { 'top-3': first },
        { 'bottom-8': last }
      )}
    />
  )
}

export { Root, Icon, Title, Content, Connector }
