import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <button
      className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shrink-0 cursor-pointer"
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
    </button>
  )
}

export default CopyButton
