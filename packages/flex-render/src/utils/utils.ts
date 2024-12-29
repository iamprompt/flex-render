import {
  FlexBoxAlignItemsClassName,
  FlexBoxBorderWidthClassName,
  FlexBoxJustifyContentClassName,
  FlexButtonStyleClassName,
  FlexElementAlignClassName,
  FlexElementFlexClassName,
  FlexElementGravityClassName,
  FlexElementPositionClassName,
  FlexElementSizeKeywordClassName,
  FlexElementSpacingClassName,
  FlexImageAspectModeClassName,
  FlexImageSizeClassName,
  FlexTextDecorationClassName,
  FlexTextStylesClassName,
  FlexTextWeightClassName,
} from '@/constants/className'

import type {
  Action,
  FlexBlockStyle,
  FlexBox,
  FlexBoxBackground,
  FlexBoxLinearGradient,
  FlexButton,
  FlexComponent,
  FlexIcon,
  FlexImage,
  FlexText,
  MessageAction,
  PostbackAction,
  URIAction,
} from '../types'
import { Element } from './dom'
import { renderSeparator } from './render'

export const FlexElementSizeKeyword = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl', 'full']
export const FlexElementSizePxRegex = /^(-?[\d.]+)px$/
export const FlexElementSizePercentRegex = /^(-?[\d.]+)%$/

export const injectSpacing = <T extends Element>(element: T, spacing: FlexBox['spacing']) => {
  if (!spacing || spacing === 'none') return element
  const className = FlexElementSpacingClassName[spacing] || undefined
  if (className) {
    element.addClassNames(className)
  }

  return element
}

export const injectMargin = <T extends Element>(
  element: T,
  margin: FlexBox['margin'],
  parentElement?: FlexComponent,
) => {
  if (!margin) return element

  const direction = isHorizontalLayout(parentElement) ? 'L' : 'T'
  const sizeClassName = FlexElementSizeKeywordClassName[margin] || undefined
  if (sizeClassName) {
    element.addClassNames(`ExMgn${direction}${sizeClassName}`)
  } else {
    const pxMatch = margin.match(FlexElementSizePxRegex)
    const percentMatch = margin.match(FlexElementSizePercentRegex)
    if (pxMatch || percentMatch) {
      if (direction === 'T') {
        element.setStyle('marginTop', margin)
      } else if (direction === 'L') {
        element.setStyle('marginLeft', margin)
      }
    }
  }

  return element
}

export const injectAspectMode = <T extends Element>(element: T, aspectMode: FlexImage['aspectMode']) => {
  if (!aspectMode) return element
  const className = FlexImageAspectModeClassName[aspectMode] || undefined
  if (className) {
    element.addClassNames(className)
  }

  return element
}

export const injectSize = <T extends Element>(
  element: T,
  size?: string,
  type: 'fontSize' | 'height' | 'width' | 'maxHeight' | 'maxWidth' | 'lineHeight' = 'height',
) => {
  if (!size) return element
  const className = FlexImageSizeClassName[size] || undefined
  if (className) {
    element.addClassNames(className)
  } else {
    const pxMatch = size.match(FlexElementSizePxRegex)
    const percentMatch = size.match(FlexElementSizePercentRegex)
    if (pxMatch || percentMatch) {
      element.setStyle(type, size)
    }
  }

  return element
}

export const injectWeight = <T extends Element>(element: T, weight?: string) => {
  if (!weight) return element
  const className = FlexTextWeightClassName[weight] || undefined
  if (className) {
    element.addClassNames(className)
  }
  return element
}

export const injectAspectRatio = <T extends Element>(element: T, aspectRatio: FlexImage['aspectRatio']) => {
  let value = 100

  const match = aspectRatio?.match(/^([\d.]+):([\d.]+)$/)

  if (match) {
    value = (Number(match[2]) / Number(match[1])) * 100
  }

  element.setStyle('paddingBottom', `${value}%`)

  return element
}

export const injectAlign = <T extends Element>(element: T, align: FlexText['align']) => {
  if (!align) return element
  const className = FlexElementAlignClassName[align] || undefined
  if (className) {
    element.addClassNames(className)
  }

  return element
}

export const injectGravity = <T extends Element>(element: T, gravity: FlexText['gravity']) => {
  if (!gravity) return element
  const className = FlexElementGravityClassName[gravity] || undefined
  if (className) {
    element.addClassNames(className)
  }

  return element
}

export const injectPosition = <T extends Element>(element: T, position: FlexBox['position']) => {
  if (!position) return element
  const className = FlexElementPositionClassName[position] || undefined
  if (className) {
    element.addClassNames(className)
  }

  return element
}

export const injectAlignItems = <T extends Element>(element: T, alignItems: FlexBox['alignItems']) => {
  if (!alignItems) return element
  const className = FlexBoxAlignItemsClassName[alignItems] || undefined
  if (className) {
    element.addClassNames(className)
  }

  return element
}

export const injectJustifyContent = <T extends Element>(element: T, justifyContent: FlexBox['justifyContent']) => {
  if (!justifyContent) return element
  const className = FlexBoxJustifyContentClassName[justifyContent] || undefined
  if (className) {
    element.addClassNames(className)
  }

  return element
}

export const injectOffset = <T extends Element>(
  element: T,
  {
    offsetBottom,
    offsetEnd,
    offsetStart,
    offsetTop,
  }: { offsetBottom?: string; offsetEnd?: string; offsetStart?: string; offsetTop?: string },
) => {
  if (!offsetBottom && !offsetEnd && !offsetStart && !offsetTop) return element

  if (offsetBottom) {
    if (FlexElementSizeKeyword.includes(offsetBottom)) {
      element.addClassNames(`ExB${FlexElementSizeKeywordClassName[offsetBottom]}`)
    } else {
      const pxMatch = offsetBottom.match(FlexElementSizePxRegex)
      const percentMatch = offsetBottom.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.setStyle('bottom', offsetBottom)
      }
    }
  }

  if (offsetTop) {
    if (FlexElementSizeKeyword.includes(offsetTop)) {
      element.addClassNames(`ExT${FlexElementSizeKeywordClassName[offsetTop]}`)
    } else {
      const pxMatch = offsetTop.match(FlexElementSizePxRegex)
      const percentMatch = offsetTop.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.setStyle('top', offsetTop)
      }
    }
  }

  if (offsetEnd) {
    if (FlexElementSizeKeyword.includes(offsetEnd)) {
      element.addClassNames(`ExR${FlexElementSizeKeywordClassName[offsetEnd]}`)
    } else {
      const pxMatch = offsetEnd.match(FlexElementSizePxRegex)
      const percentMatch = offsetEnd.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.setStyle('right', offsetEnd)
      }
    }
  }

  if (offsetStart) {
    if (FlexElementSizeKeyword.includes(offsetStart)) {
      element.addClassNames(`ExL${FlexElementSizeKeywordClassName[offsetStart]}`)
    } else {
      const pxMatch = offsetStart.match(FlexElementSizePxRegex)
      const percentMatch = offsetStart.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.setStyle('left', offsetStart)
      }
    }
  }

  return element
}

export const injectPadding = <T extends Element>(
  element: T,
  { paddingAll, paddingBottom, paddingEnd, paddingStart, paddingTop }: FlexBox,
) => {
  if (!paddingAll && !paddingBottom && !paddingEnd && !paddingStart && !paddingTop) return element

  if (paddingAll) {
    if (FlexElementSizeKeyword.includes(paddingAll)) {
      element.addClassNames(`ExPadA${FlexElementSizeKeywordClassName[paddingAll]}`)
    } else {
      const pxMatch = paddingAll.match(FlexElementSizePxRegex)
      const percentMatch = paddingAll.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.setStyle('padding', paddingAll)
      }
    }
  }

  if (paddingBottom) {
    if (FlexElementSizeKeyword.includes(paddingBottom)) {
      element.addClassNames(`ExPadB${FlexElementSizeKeywordClassName[paddingBottom]}`)
    } else {
      const pxMatch = paddingBottom.match(FlexElementSizePxRegex)
      const percentMatch = paddingBottom.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.setStyle('paddingBottom', paddingBottom)
      }
    }
  }

  if (paddingEnd) {
    if (FlexElementSizeKeyword.includes(paddingEnd)) {
      element.addClassNames(`ExPadR${FlexElementSizeKeywordClassName[paddingEnd]}`)
    } else {
      const pxMatch = paddingEnd.match(FlexElementSizePxRegex)
      const percentMatch = paddingEnd.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.setStyle('paddingRight', paddingEnd)
      }
    }
  }

  if (paddingStart) {
    if (FlexElementSizeKeyword.includes(paddingStart)) {
      element.addClassNames(`ExPadL${FlexElementSizeKeywordClassName[paddingStart]}`)
    } else {
      const pxMatch = paddingStart.match(FlexElementSizePxRegex)
      const percentMatch = paddingStart.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.setStyle('paddingLeft', paddingStart)
      }
    }
  }

  if (paddingTop) {
    if (FlexElementSizeKeyword.includes(paddingTop)) {
      element.addClassNames(`ExPadT${FlexElementSizeKeywordClassName[paddingTop]}`)
    } else {
      const pxMatch = paddingTop.match(FlexElementSizePxRegex)
      const percentMatch = paddingTop.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.setStyle('paddingTop', paddingTop)
      }
    }
  }

  return element
}

export const injectFlex = <T extends Element>(element: T, flex: FlexBox['flex']) => {
  if (flex === undefined || flex === null) return element
  const flexString = flex.toString()

  const className = FlexElementFlexClassName[flexString] || undefined
  if (className) {
    element.addClassNames(className)
  } else {
    element.setStyle('WebkitFlex', flexString)
    element.setStyle('flexGrow', flexString)
  }

  return element
}

export const injectButtonStyle = <T extends Element>(element: T, style: FlexButton['style']) => {
  if (!style) return element
  const className = FlexButtonStyleClassName[style] || undefined
  if (className) {
    element.addClassNames(className)
  }
  return element
}

const colorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/
export const injectColor = <T extends Element>(
  element: T,
  color?: string,
  type: 'backgroundColor' | 'color' | 'borderColor' = 'color',
) => {
  if (!color) return element
  const match = color.match(colorRegex)
  if (match) {
    element.setStyle(type, color)
  }
  return element
}

export const injectBackground = <T extends Element>(element: T, background?: FlexBoxBackground) => {
  if (!background) return element
  if (background.type === 'linearGradient') {
    const { angle, startColor, endColor, centerColor, centerPosition } = background as FlexBoxLinearGradient
    const matchAngle = angle?.match(/^(\d+)deg$/)
    const matchStartColor = startColor?.match(colorRegex)
    const matchEndColor = endColor?.match(colorRegex)
    const matchCenterColor = centerColor?.match(colorRegex)
    const matchCenterPosition = centerPosition?.match(/^([\d.]+)%$/)
    if (!centerColor || !centerPosition) {
      if (matchAngle && matchStartColor && matchEndColor) {
        element.setStyle('background', `linear-gradient(${angle}, ${startColor} 0%, ${endColor} 100%)`)
      }
    } else {
      if (matchAngle && matchStartColor && matchCenterColor && matchCenterPosition && matchEndColor) {
        element.setStyle(
          'background',
          `linear-gradient(${angle}, ${startColor} 0%, ${centerColor} ${centerPosition}, ${endColor} 100%)`,
        )
      }
    }
  }
  return element
}

export const injectWrap = <T extends Element>(element: T, wrap: FlexText['wrap']) => {
  if (!wrap) return element
  element.addClassNames('ExWrap')
  return element
}

export const injectBorderWidth = <T extends Element>(element: T, borderWidth: FlexBox['borderWidth']) => {
  if (!borderWidth) return element
  const className = FlexBoxBorderWidthClassName[borderWidth] || undefined
  if (className) {
    element.addClassNames(className)
  } else {
    const pxMatch = borderWidth.match(FlexElementSizePxRegex)
    const percentMatch = borderWidth.match(FlexElementSizePercentRegex)
    if (pxMatch || percentMatch) {
      element.setStyle('borderWidth', borderWidth)
    }
  }
  return element
}

export const injectCornerRadius = <T extends Element>(element: T, cornerRadius: FlexBox['cornerRadius']) => {
  if (!cornerRadius) return element
  const className = FlexElementSizeKeywordClassName[cornerRadius] || undefined
  if (className) {
    element.addClassNames(`ExBdrRad${className}`)
  } else {
    const pxMatch = cornerRadius.match(FlexElementSizePxRegex)
    const percentMatch = cornerRadius.match(FlexElementSizePercentRegex)
    if (pxMatch || percentMatch) {
      element.setStyle('borderRadius', cornerRadius)
    }
  }
  return element
}

export const injectIconAspectRatio = <T extends Element>(element: T, aspectRatio: FlexIcon['aspectRatio']) => {
  let value = 1

  const match = aspectRatio?.match(/^([\d.]+):([\d.]+)$/)

  if (match) {
    value = Number(match[1]) / Number(match[2])
  }

  element.setStyle('width', `${value}em`)

  return element
}

export const injectFontStyle = <T extends Element>(element: T, fontStyle: FlexText['style']) => {
  if (!fontStyle) return element
  const className = FlexTextStylesClassName[fontStyle] || undefined
  if (className) {
    element.addClassNames(className)
  }
  return element
}

export const injectFontDecoration = <T extends Element>(element: T, decoration: FlexText['decoration']) => {
  if (!decoration) return element
  const className = FlexTextDecorationClassName[decoration] || undefined
  if (className) {
    element.addClassNames(className)
  }
  return element
}

export const injectSectionStyle = <T extends Element, U extends Element | undefined>(
  element: T,
  style: FlexBlockStyle | undefined,
  type: 'header' | 'hero' | 'body' | 'footer',
  parentHTMLElement: U,
): [T, U] => {
  if (style) {
    const { separator, separatorColor, backgroundColor } = style
    element = injectColor(element, backgroundColor, 'backgroundColor')
    if (type !== 'header' && separator) {
      const separator = renderSeparator({
        type: 'separator',
        color: separatorColor,
      })
      parentHTMLElement?.appendChild(separator)
    }
  }
  return [element, parentHTMLElement]
}

export const injectAction = <T extends Element>(element: T, action?: Action) => {
  if (!action) return element
  switch (action.type) {
    case 'uri':
      element.setAttribute('target', '_blank')
      element.setAttribute('href', (action as URIAction).uri || '')
      element.setAttribute('onclick', `window.open('${(action as URIAction).uri || ''}')`)
      break
    case 'message':
      element.setAttribute('onclick', `alert('Send Message: ${(action as MessageAction).text} to chatroom')`)
      break
    case 'postback':
      element.setAttribute('onclick', `alert('Send Postback: ${(action as PostbackAction).data}')`)
      break
    case 'datetimepicker':
      element.setAttribute('onclick', `alert('Open Datepicker')`)
      break
    case 'clipboard':
      element.setAttribute(
        'onclick',
        `window.navigator.clipboard.writeText('${action.clipboardText}').then(() => alert('Copied to Clipboard: ${action.clipboardText}'))`,
      )
      break
  }

  element.setStyle('cursor', 'pointer')

  return element
}

export const isSizeKeyword = (size?: string) => {
  return size && FlexElementSizeKeyword.includes(size)
}

export const isSizeValue = (size?: string) => {
  return size && (FlexElementSizePxRegex.test(size) || FlexElementSizePercentRegex.test(size))
}

export const isHorizontalLayout = (layout?: FlexComponent) => {
  return layout?.type === 'box' && (layout.layout === 'horizontal' || layout.layout === 'baseline')
}

export const camelCaseToKebabCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}
