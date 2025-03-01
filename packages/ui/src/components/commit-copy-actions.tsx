import { useEffect, useState } from 'react'

import { Icon, ShaBadge } from '@/components'
import copy from 'clipboard-copy'

export const CommitCopyActions = ({ sha }: { sha: string }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let timeoutId: number
    if (copied) {
      copy(sha)
      timeoutId = window.setTimeout(() => setCopied(false), 2500)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [copied, sha])

  return (
    <ShaBadge.Root>
      <ShaBadge.Content className="hover:bg-transparent">
        <span className="text-13 text-foreground-3">{sha.substring(0, 7)}</span>
      </ShaBadge.Content>
      <ShaBadge.Icon handleClick={() => setCopied(true)}>
        <Icon size={16} name={copied ? 'tick' : 'clone'} className="text-icons-3" />
      </ShaBadge.Icon>
    </ShaBadge.Root>
  )
}
