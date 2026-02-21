import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <header className="h-16 flex items-center justify-between border-b border-slate-200 bg-white px-6 shrink-0 z-20">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-600 text-white p-1.5 rounded-lg flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
        </div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">Flex Message Explorer</h1>
      </div>
      <div className="flex items-center gap-8">
        <nav className="hidden lg:flex items-center gap-8">
          <a
            className="text-slate-500 text-xs font-bold uppercase tracking-wider hover:text-emerald-600 transition-colors"
            href="https://developers.line.biz/en/docs/messaging-api/using-flex-messages/"
            target="_blank"
            rel="noreferrer"
          >
            Documentation
          </a>
          <a
            className="text-slate-500 text-xs font-bold uppercase tracking-wider hover:text-emerald-600 transition-colors"
            href="https://developers.line.biz/flex-simulator/"
            target="_blank"
            rel="noreferrer"
          >
            Playground
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </Button>
          <Avatar className="size-9 border border-slate-200">
            <AvatarFallback className="bg-slate-100 text-slate-500 cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default Header
