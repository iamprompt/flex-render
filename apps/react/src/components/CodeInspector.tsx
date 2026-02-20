import { JSX, useMemo } from 'react'

import CopyButton from './CopyButton'

interface CodeInspectorProps {
  title: string
  json: any
}

/** Simple JSON syntax highlighter returning JSX */
function highlightJson(json: any): JSX.Element {
  const raw = JSON.stringify(json, null, 2)
  const lines = raw.split('\n')

  return (
    <pre className="text-xs leading-relaxed">
      <code>
        <span className="text-text-dim">{'// Flex Message Bubble\n'}</span>
        {lines.map((line, i) => (
          <span key={i}>
            {colorLine(line)}
            {i < lines.length - 1 ? '\n' : ''}
          </span>
        ))}
      </code>
    </pre>
  )
}

function colorLine(line: string): JSX.Element {
  // Match key-value pairs: "key": "value" or "key": { or "key": [ etc.
  const kvMatch = line.match(/^(\s*)"([^"]+)":\s*(.*)$/)
  if (kvMatch) {
    const [, indent, key, rest] = kvMatch
    return (
      <span>
        {indent}
        <span className="text-primary">"{key}"</span>
        <span className="text-slate-900">: </span>
        {colorValue(rest)}
      </span>
    )
  }

  // Standalone values (in arrays)
  const valMatch = line.match(/^(\s*)(.+)$/)
  if (valMatch) {
    const [, indent, value] = valMatch
    return (
      <span>
        {indent}
        {colorValue(value)}
      </span>
    )
  }

  return <span>{line}</span>
}

function colorValue(value: string): JSX.Element {
  // String value: "..."
  const strMatch = value.match(/^"([^"]*)"(.*)$/)
  if (strMatch) {
    return (
      <span>
        <span className="text-blue-600">"{strMatch[1]}"</span>
        <span className="text-slate-900">{strMatch[2]}</span>
      </span>
    )
  }

  // Number
  const numMatch = value.match(/^(\d+\.?\d*)(.*)$/)
  if (numMatch) {
    return (
      <span>
        <span className="text-orange-600">{numMatch[1]}</span>
        <span className="text-slate-900">{numMatch[2]}</span>
      </span>
    )
  }

  // Boolean / null
  const boolMatch = value.match(/^(true|false|null)(.*)$/)
  if (boolMatch) {
    return (
      <span>
        <span className="text-purple-600">{boolMatch[1]}</span>
        <span className="text-slate-900">{boolMatch[2]}</span>
      </span>
    )
  }

  // Brackets & braces
  return (
    <span>
      {[...value].map((ch, i) => {
        if (ch === '{' || ch === '}')
          return (
            <span key={i} className="text-amber-600">
              {ch}
            </span>
          )
        if (ch === '[' || ch === ']')
          return (
            <span key={i} className="text-purple-600">
              {ch}
            </span>
          )
        return (
          <span key={i} className="text-slate-900">
            {ch}
          </span>
        )
      })}
    </span>
  )
}

function CodeInspector({ title, json }: CodeInspectorProps) {
  const jsonStr = useMemo(() => JSON.stringify(json, null, 2), [json])
  const lineCount = useMemo(() => jsonStr.split('\n').length, [jsonStr])
  const charCount = useMemo(() => jsonStr.length.toLocaleString(), [jsonStr])
  const highlighted = useMemo(() => highlightJson(json), [json])

  return (
    <aside className="w-80 xl:w-96 flex flex-col border-l border-border-light bg-green-50 text-slate-600 shrink-0">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-border-light bg-surface-light shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0">data_object</span>
          <span className="text-sm font-medium text-slate-900 truncate">
            {title.toLowerCase().replace(/\s+/g, '_')}.json
          </span>
        </div>
        <CopyButton text={jsonStr} />
      </div>

      {/* Code area */}
      <div className="flex-1 overflow-auto custom-scrollbar p-4 font-mono relative group">{highlighted}</div>

      {/* Footer stats */}
      <div className="h-10 border-t border-border-light bg-surface-light flex items-center justify-between px-4 text-[10px] text-text-dim shrink-0">
        <span>JSON</span>
        <span>
          {lineCount} lines • {charCount} chars
        </span>
        <span>UTF-8</span>
      </div>
    </aside>
  )
}

export default CodeInspector
