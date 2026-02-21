import { FlexContainer, FlexPreview } from 'flex-render-react'
import { useEffect, useState } from 'react'

import { Avatar } from './Avatar'

interface DevicePreviewProps {
  json: FlexContainer
}

function DevicePreview({ json }: DevicePreviewProps) {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="flex-1 flex flex-col bg-[#8bacd9] relative min-w-[320px]">
      {/* Toolbar */}
      <div className="h-14 border-b border-border-light flex items-center justify-between px-6 bg-surface-light shrink-0 relative z-10 w-full">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Device Preview</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 w-full object-contain pb-8 pt-4">
        {/* Date Header */}
        <div className="flex justify-center">
          <span className="bg-black/20 text-white text-[11px] font-medium px-4 py-1.5 rounded-full">วันนี้</span>
        </div>

        {/* Message Container */}
        {json.type === 'carousel' ? (
          <div className="flex flex-col gap-2 w-full max-w-full">
            {/* Avatar */}
            <Avatar className="ml-2" />

            <FlexPreview json={json} className="w-fit" />
            {/* Time */}
            <div className="text-[10px] text-white/90 shrink-0 tracking-wide font-medium text-right mr-2">
              {currentTime}
            </div>
          </div>
        ) : (
          <div className="flex gap-2 w-full max-w-full">
            {/* Avatar */}
            <Avatar className="ml-2" />

            <div className="flex flex-1 items-end min-w-0">
              <FlexPreview json={json} className="w-fit" />

              {/* Time */}
              <div className="text-[10px] text-white/90 shrink-0 tracking-wide font-medium ml-3 -mb-1">
                {currentTime}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default DevicePreview
