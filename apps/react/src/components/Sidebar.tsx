import { useMemo, useState } from 'react'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { type FlexModule, groupByCategory } from '@/utils/flex'

interface SidebarProps {
  modules: FlexModule[]
  selectedId: string
  onSelect: (mod: FlexModule) => void
}

function Sidebar({ modules, selectedId, onSelect }: SidebarProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return modules
    const q = search.toLowerCase()
    return modules.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.author.toLowerCase().includes(q),
    )
  }, [modules, search])

  const groups = useMemo(() => groupByCategory(filtered), [filtered])

  return (
    <aside className="w-72 xl:w-80 flex flex-col border-r border-border-light bg-surface-light shrink-0">
      {/* Search */}
      <div className="p-4 border-b border-border-light">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-dim group-focus-within:text-foreground transition-colors z-10">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <Input
            className="pl-10"
            placeholder="Search templates..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category list */}
      <ScrollArea className="flex-1 w-full">
        <div className="p-3 space-y-6">
          {groups.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">No templates found</div>
          )}
          {groups.map((group) => (
            <div key={group.name}>
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {group.name}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = item.id === selectedId
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                        isActive
                          ? 'bg-primary/10 border border-primary/20 text-primary'
                          : 'hover:bg-accent text-accent-foreground border border-transparent'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                        } transition-colors`}
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium truncate">{item.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
