import '@/styles/globals.css'

import { FlexModules } from '@/utils/flex'
import FlexPreview from '@/components/FlexPreview'
import ViewJSONButton from './components/ViewJSONButton'

function App() {
  return (
    <div className="m-8">
      {FlexModules.map(({ id, title, json, author, authorUrl }) => (
        <div key={id} data-id={id}>
          <div className="flex mt-8 mb-4 flex-col sm:flex-row sm:items-baseline">
            <div className="flex flex-row space-x-4">
              <ViewJSONButton id={id} title={title} json={json} />
              <h2 className="font-bold text-3xl text-white">{title || id}</h2>
            </div>
            {author && (
              <span className="sm:ml-4 text-white text-sm">
                (By{' '}
                <a href={authorUrl || '#'} target="_blank" rel="noreferrer">
                  {author}
                </a>
                )
              </span>
            )}
          </div>
          <FlexPreview json={json} />
        </div>
      ))}
    </div>
  )
}

export default App
