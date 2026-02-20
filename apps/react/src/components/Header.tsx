function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-border-light bg-surface-light px-6 py-3 shrink-0 z-20">
      <div className="flex items-center gap-3">
        <div className="text-primary">
          <span className="material-symbols-outlined text-3xl">chat_bubble</span>
        </div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">Flex Message Explorer</h1>
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6">
          <a
            className="text-slate-600 text-sm font-medium hover:text-primary transition-colors"
            href="https://developers.line.biz/en/docs/messaging-api/using-flex-messages/"
            target="_blank"
            rel="noreferrer"
          >
            Documentation
          </a>
          <a
            className="text-slate-600 text-sm font-medium hover:text-primary transition-colors"
            href="https://developers.line.biz/flex-simulator/"
            target="_blank"
            rel="noreferrer"
          >
            Playground
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="bg-border-light text-slate-900 rounded-lg p-2 hover:bg-border-light-hover transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <div className="size-9 bg-border-light rounded-full border border-border-light-hover flex items-center justify-center">
            <span className="material-symbols-outlined text-text-muted text-[20px]">person</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
