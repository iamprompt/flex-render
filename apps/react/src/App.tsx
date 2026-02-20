import '@/styles/globals.css'
import 'flex-render-react/css'

import { useState } from 'react'

import CodeInspector from '@/components/CodeInspector'
import DevicePreview from '@/components/DevicePreview'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { type FlexModule, FlexModules } from '@/utils/flex'

function App() {
  const [selected, setSelected] = useState<FlexModule>(FlexModules[0])

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-dark text-slate-100 font-display">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <Sidebar
          modules={FlexModules}
          selectedId={selected.id}
          onSelect={setSelected}
        />
        <DevicePreview json={selected.json} />
        <CodeInspector title={selected.title} json={selected.json} />
      </main>
    </div>
  )
}

export default App
