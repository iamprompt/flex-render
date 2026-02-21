import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <Button
      size="sm"
      className="flex items-center gap-2 shrink-0 cursor-pointer text-xs font-bold"
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
      }}
    >
      {!copied ? (
        <>
          <Copy size={14} />
          Copy
        </>
      ) : (
        <>
          <Check size={14} />
          Copied!
        </>
      )}
    </Button>
  )
}

export default CopyButton
