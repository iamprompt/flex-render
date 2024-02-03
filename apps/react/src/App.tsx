import '@/styles/globals.css'
import '@flex-render/react/css'

import { FlexPreview } from '@flex-render/react'

import { FlexModules } from '@/utils/flex'

import ViewJSONButton from './components/ViewJSONButton'

function App() {
  return (
    <div className="m-8">
      {FlexModules.map(({ id, title, json, author, authorUrl }) => (
        <div data-id={id} key={id}>
          <div className="flex mt-8 mb-4 flex-col sm:flex-row sm:items-baseline">
            <div className="flex flex-row space-x-4">
              <ViewJSONButton id={id} json={json} title={title} />
              <h2 className="font-bold text-3xl text-white">{title || id}</h2>
            </div>
            {author ? (
              <span className="sm:ml-4 text-white text-sm">
                (By{' '}
                <a href={authorUrl || '#'} rel="noreferrer" target="_blank">
                  {author}
                </a>
                )
              </span>
            ) : null}
          </div>
          <FlexPreview json={json} />
        </div>
      ))}
    </div>
  )
}

export default App
