import { useEffect, useState } from 'react'

import { Check, Copy } from 'lucide-react'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  return (
    <div className="group z-10 relative">
      <button
        className="h-7 w-7 flex items-center justify-center rounded-md"
        onClick={async () => {
          await navigator.clipboard.writeText(text)
          setCopied(true)
        }}
      >
        {!copied ? (
          <Copy className="text-gray-700 group-hover:text-gray-400" size={16} />
        ) : (
          <Check className="text-green-400" size={16} />
        )}
      </button>
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block text-white rounded-lg px-1.5 py-0.5 text-xs bg-primary-dark">
        {copied ? 'Copied!' : 'Copy'}
      </div>
    </div>
  )
}

export default CopyButton
