import type { FlexContainer } from '@line/bot-sdk'
import * as React from 'react'

import { render } from '@/utils/render'

export type FlexPreviewProps = {
  json: FlexContainer
}

const FlexPreview = ({ json }: FlexPreviewProps) => {
  return <div dangerouslySetInnerHTML={{ __html: render(json) }} />
}

export default FlexPreview
