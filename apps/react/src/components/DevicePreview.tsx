import { FlexPreview } from 'flex-render-react'

interface DevicePreviewProps {
  json: any
}

function DevicePreview({ json }: DevicePreviewProps) {
  return (
    <section className="flex-1 flex flex-col bg-bg-lighter relative min-w-[320px]">
      {/* Toolbar */}
      <div className="h-14 border-b border-border-light flex items-center justify-between px-6 bg-surface-light shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Device Preview</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <FlexPreview json={json} />
      </div>
    </section>
  )
}

export default DevicePreview
