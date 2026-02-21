import 'flex-render/css'

import { type FlexContainer, render } from 'flex-render'

export type FlexPreviewProps = {
  json: FlexContainer
  className?: string
}

export const FlexPreview = ({ json, className = '' }: FlexPreviewProps) => {
  return <div className={className} dangerouslySetInnerHTML={{ __html: render(json) }} />
}
