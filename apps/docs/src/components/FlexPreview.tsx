import 'flex-render/css'
import { render } from 'flex-render'

function FlexPreview({ json }: { json: Parameters<typeof render>[0] }) {
  return <div dangerouslySetInnerHTML={{ __html: render(json) }} />
}

export default FlexPreview
