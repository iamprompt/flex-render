import 'flex-render/css'

import { type FlexContainer, render } from 'flex-render'

export type FlexPreviewProps = {
  json: FlexContainer
}

export const FlexPreview = ({ json }: FlexPreviewProps) => {
  return <div dangerouslySetInnerHTML={{ __html: render(json) }} />
}
