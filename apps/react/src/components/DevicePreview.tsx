import { FlexPreview } from 'flex-render-react'

interface DevicePreviewProps {
  json: any
}

function DevicePreview({ json }: DevicePreviewProps) {
  return (
    <section className="flex-1 flex flex-col bg-bg-darker relative min-w-[320px]">
      {/* Toolbar */}
      <div className="h-14 border-b border-border-dark flex items-center justify-between px-6 bg-surface-dark shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Device Preview</span>
        </div>
        <div className="flex items-center gap-2 bg-border-dark p-1 rounded-lg">
          <button className="p-1.5 rounded bg-border-dark-hover shadow-sm text-primary">
            <span className="material-symbols-outlined text-[18px]">smartphone</span>
          </button>
          <button className="p-1.5 rounded hover:bg-border-dark-hover text-text-dim transition-all">
            <span className="material-symbols-outlined text-[18px]">tablet</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <FlexPreview json={json} />
      </div>
    </section>
  )
}

export default DevicePreview
