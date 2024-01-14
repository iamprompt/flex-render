import './App.css'
import '../../dist/main.css'

import { render } from '../../dist'
import samples from './assets/samples.json'
const flexModulesGlob = import.meta.glob('./assets/flex/*.json', { eager: true })
const flexModules = Object.entries(flexModulesGlob).map(([path, module]) => {
  const key = path.replace('./assets/flex/', '').replace('.json', '')

  const sample = samples.find((s) => s.id === key)

  return { json: (module as any).default, id: key, ...sample }
})

function App() {
  return (
    <>
      {flexModules.map(({ id, title, json }) => (
        <div key={id}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: '2rem 0 1rem',
              color: '#FFFFFF',
            }}
          >
            {title || id}
          </h2>
          <FlexPreview json={json} />
        </div>
      ))}
    </>
  )
}

const FlexPreview = ({ json }: { json: Parameters<typeof render>[0] }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: render(json),
      }}
    />
  )
}

export default App
