import type {
  FlexBlockStyle,
  FlexBox,
  FlexBubble,
  FlexButton,
  FlexComponent,
  FlexIcon,
  FlexImage,
  FlexText,
  Offset,
} from '@line/bot-sdk'
import { parseHTML } from 'linkedom'
import {
  FlexBoxAlignItemsClassName,
  FlexBoxBorderWidthClassName,
  FlexBoxJustifyContentClassName,
  FlexButtonStyleClassName,
  FlexElementAlignClassName,
  FlexElementFlexClassName,
  FlexElementGravityClassName,
  FlexElementMarginClassName,
  FlexElementPositionClassName,
  FlexElementSizeKeywordClassName,
  FlexElementSpacingClassName,
  FlexImageAspectModeClassName,
  FlexImageSizeClassName,
  FlexTextDecorationClassName,
  FlexTextStylesClassName,
  FlexTextWeightClassName,
} from './className'
import { renderSeparator } from './render'

export const getDocument = () => {
  if (typeof window !== 'undefined') {
    return window.document
  }

  const { document } = parseHTML('<!doctype html><html><head></head><body></body></html>')

  return document
}

export const FlexElementSizeKeyword = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl', '4xl', '5xl', 'full']
export const FlexElementSizePxRegex = /^(-?[\d\.]+)px$/
export const FlexElementSizePercentRegex = /^(-?[\d\.]+)%$/

export const injectSpacing = <T extends HTMLElement>(element: T, spacing: FlexBox['spacing']) => {
  if (!spacing || spacing === 'none') return element
  const className = FlexElementSpacingClassName[spacing] || undefined
  if (className) {
    element.classList.add(className)
  } else {
  }

  return element
}

export const injectMargin = <T extends HTMLElement>(
  element: T,
  margin: FlexBox['margin'],
  parentElement?: FlexComponent
) => {
  if (!margin) return element

  const direction = parentElement?.type === 'box' && parentElement?.layout === 'vertical' ? 'T' : 'L'
  const sizeClassName = FlexElementSizeKeywordClassName[margin] || undefined
  if (sizeClassName) {
    element.classList.add(`ExMgn${direction}${sizeClassName}`)
  } else {
    const pxMatch = margin.match(FlexElementSizePxRegex)
    const percentMatch = margin.match(FlexElementSizePercentRegex)
    if (pxMatch || percentMatch) {
      if (direction === 'T') {
        element.style.marginTop = margin
      } else if (direction === 'L') {
        element.style.marginLeft = margin
      }
    }
  }

  return element
}

export const injectAspectMode = <T extends HTMLElement>(element: T, aspectMode: FlexImage['aspectMode']) => {
  if (!aspectMode) return element
  const className = FlexImageAspectModeClassName[aspectMode] || undefined
  className && element.classList.add(className)

  return element
}

export const injectSize = <T extends HTMLElement>(
  element: T,
  size?: string,
  type: 'fontSize' | 'height' | 'width' | 'maxHeight' | 'maxWidth' | 'lineHeight' = 'height'
) => {
  if (!size) return element
  const className = FlexImageSizeClassName[size] || undefined
  if (className) {
    element.classList.add(className)
  } else {
    const pxMatch = size.match(FlexElementSizePxRegex)
    const percentMatch = size.match(FlexElementSizePercentRegex)
    if (pxMatch || percentMatch) {
      element.style[type] = size
    }
  }

  return element
}

export const injectWeight = <T extends HTMLElement>(element: T, weight?: string) => {
  if (!weight) return element
  const className = FlexTextWeightClassName[weight] || undefined
  className && element.classList.add(className)
  return element
}

export const injectAspectRatio = <T extends HTMLElement>(element: T, aspectRatio: FlexImage['aspectRatio']) => {
  let value = 100

  const match = aspectRatio?.match(/^([\d\.]+):([\d\.]+)$/)

  if (match) {
    value = (Number(match[2]) / Number(match[1])) * 100
  }

  element.style.paddingBottom = `${value}%`

  return element
}

export const injectAlign = <T extends HTMLElement>(element: T, align: FlexText['align']) => {
  if (!align) return element
  const className = FlexElementAlignClassName[align] || undefined
  if (className) {
    element.classList.add(className)
  } else {
  }

  return element
}

export const injectGravity = <T extends HTMLElement>(element: T, gravity: FlexText['gravity']) => {
  if (!gravity) return element
  const className = FlexElementGravityClassName[gravity] || undefined
  if (className) {
    element.classList.add(className)
  } else {
  }

  return element
}

export const injectPosition = <T extends HTMLElement>(element: T, position: FlexBox['position']) => {
  if (!position) return element
  const className = FlexElementPositionClassName[position] || undefined
  if (className) {
    element.classList.add(className)
  } else {
  }

  return element
}

export const injectAlignItems = <T extends HTMLElement>(element: T, alignItems: FlexBox['alignItems']) => {
  if (!alignItems) return element
  const className = FlexBoxAlignItemsClassName[alignItems] || undefined
  if (className) {
    element.classList.add(className)
  } else {
  }

  return element
}

export const injectJustifyContent = <T extends HTMLElement>(element: T, justifyContent: FlexBox['justifyContent']) => {
  if (!justifyContent) return element
  const className = FlexBoxJustifyContentClassName[justifyContent] || undefined
  if (className) {
    element.classList.add(className)
  } else {
  }

  return element
}

export const injectOffset = <T extends HTMLElement>(
  element: T,
  { offsetBottom, offsetEnd, offsetStart, offsetTop }: Offset
) => {
  if (!offsetBottom && !offsetEnd && !offsetStart && !offsetTop) return element

  if (offsetBottom) {
    if (FlexElementSizeKeyword.includes(offsetBottom)) {
      element.classList.add(`ExB${offsetBottom.toUpperCase()}`)
    } else {
      const pxMatch = offsetBottom.match(FlexElementSizePxRegex)
      const percentMatch = offsetBottom.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.style.bottom = offsetBottom
      }
    }
  }

  if (offsetTop) {
    if (FlexElementSizeKeyword.includes(offsetTop)) {
      element.classList.add(`ExT${offsetTop.toUpperCase()}`)
    } else {
      const pxMatch = offsetTop.match(FlexElementSizePxRegex)
      const percentMatch = offsetTop.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.style.top = offsetTop
      }
    }
  }

  if (offsetEnd) {
    if (FlexElementSizeKeyword.includes(offsetEnd)) {
      element.classList.add(`ExT${offsetEnd.toUpperCase()}`)
    } else {
      const pxMatch = offsetEnd.match(FlexElementSizePxRegex)
      const percentMatch = offsetEnd.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.style.right = offsetEnd
      }
    }
  }

  if (offsetStart) {
    if (FlexElementSizeKeyword.includes(offsetStart)) {
      element.classList.add(`ExT${offsetStart.toUpperCase()}`)
    } else {
      const pxMatch = offsetStart.match(FlexElementSizePxRegex)
      const percentMatch = offsetStart.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.style.left = offsetStart
      }
    }
  }

  return element
}

export const injectPadding = <T extends HTMLElement>(
  element: T,
  { paddingAll, paddingBottom, paddingEnd, paddingStart, paddingTop }: FlexBox
) => {
  if (!paddingAll && !paddingBottom && !paddingEnd && !paddingStart && !paddingTop) return element

  if (paddingAll) {
    if (FlexElementSizeKeyword.includes(paddingAll)) {
      element.classList.add(`ExPadA${paddingAll.toUpperCase()}`)
    } else {
      const pxMatch = paddingAll.match(FlexElementSizePxRegex)
      const percentMatch = paddingAll.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.style.padding = paddingAll
      }
    }
  }

  if (paddingBottom) {
    if (FlexElementSizeKeyword.includes(paddingBottom)) {
      element.classList.add(`ExT${paddingBottom.toUpperCase()}`)
    } else {
      const pxMatch = paddingBottom.match(FlexElementSizePxRegex)
      const percentMatch = paddingBottom.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.style.paddingBottom = paddingBottom
      }
    }
  }

  if (paddingEnd) {
    if (FlexElementSizeKeyword.includes(paddingEnd)) {
      element.classList.add(`ExT${paddingEnd.toUpperCase()}`)
    } else {
      const pxMatch = paddingEnd.match(FlexElementSizePxRegex)
      const percentMatch = paddingEnd.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.style.paddingRight = paddingEnd
      }
    }
  }

  if (paddingStart) {
    if (FlexElementSizeKeyword.includes(paddingStart)) {
      element.classList.add(`ExT${paddingStart.toUpperCase()}`)
    } else {
      const pxMatch = paddingStart.match(FlexElementSizePxRegex)
      const percentMatch = paddingStart.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.style.paddingLeft = paddingStart
      }
    }
  }

  if (paddingTop) {
    if (FlexElementSizeKeyword.includes(paddingTop)) {
      element.classList.add(`ExT${paddingTop.toUpperCase()}`)
    } else {
      const pxMatch = paddingTop.match(FlexElementSizePxRegex)
      const percentMatch = paddingTop.match(FlexElementSizePercentRegex)
      if (pxMatch || percentMatch) {
        element.style.paddingTop = paddingTop
      }
    }
  }

  return element
}

export const injectFlex = <T extends HTMLElement>(element: T, flex: FlexBox['flex']) => {
  if (flex === undefined || flex === null) return element
  const flexString = flex.toString()

  const className = FlexElementFlexClassName[flexString] || undefined
  if (className) {
    element.classList.add(className)
  } else {
    element.style.webkitFlex = flexString
    element.style.flexGrow = flexString
  }

  return element
}

export const injectButtonStyle = <T extends HTMLElement>(element: T, style: FlexButton['style']) => {
  if (!style) return element
  const className = FlexButtonStyleClassName[style] || undefined
  className && element.classList.add(className)
  return element
}

const colorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/
export const injectColor = <T extends HTMLElement>(
  element: T,
  color?: string,
  type: 'backgroundColor' | 'color' | 'borderColor' = 'color'
) => {
  if (!color) return element
  const match = color.match(colorRegex)
  if (match) {
    element.style[type] = color
  }
  return element
}

export const injectBackground = <T extends HTMLElement>(element: T, background?: FlexBox['background']) => {
  if (!background) return element
  const { type, angle, startColor, endColor, centerColor, centerPosition } = background
  if (type === 'linearGradient') {
    const matchAngle = angle?.match(/^(\d+)deg$/)
    const matchStartColor = startColor?.match(colorRegex)
    const matchEndColor = endColor?.match(colorRegex)
    const matchCenterColor = centerColor?.match(colorRegex)
    const matchCenterPosition = centerPosition?.match(/^([\d\.]+)%$/)
    if (!centerColor || !centerPosition) {
      if (matchAngle && matchStartColor && matchEndColor) {
        element.style.background = `linear-gradient(${angle}deg, ${startColor}, ${endColor})`
      }
    } else {
      if (matchAngle && matchStartColor && matchCenterColor && matchCenterPosition && matchEndColor) {
        element.style.background = `linear-gradient(${angle}deg, ${startColor} 0%, ${centerColor} ${centerPosition}, ${endColor} 100%)`
      }
    }
  }
  return element
}

export const injectWrap = <T extends HTMLElement>(element: T, wrap: FlexText['wrap']) => {
  if (!wrap) return element
  element.classList.add('ExWrap')
  return element
}

export const injectBorderWidth = <T extends HTMLElement>(element: T, borderWidth: FlexBox['borderWidth']) => {
  if (!borderWidth) return element
  const className = FlexBoxBorderWidthClassName[borderWidth] || undefined
  if (className) {
    element.classList.add(className)
  } else {
    const pxMatch = borderWidth.match(FlexElementSizePxRegex)
    const percentMatch = borderWidth.match(FlexElementSizePercentRegex)
    if (pxMatch || percentMatch) {
      element.style.borderWidth = borderWidth
    }
  }
  return element
}

export const injectCornerRadius = <T extends HTMLElement>(element: T, cornerRadius: FlexBox['cornerRadius']) => {
  if (!cornerRadius) return element
  const className = FlexElementSizeKeywordClassName[cornerRadius] || undefined
  if (className) {
    element.classList.add(`ExBdrRad${className}`)
  } else {
    const pxMatch = cornerRadius.match(FlexElementSizePxRegex)
    const percentMatch = cornerRadius.match(FlexElementSizePercentRegex)
    if (pxMatch || percentMatch) {
      element.style.borderRadius = cornerRadius
    }
  }
  return element
}

export const injectIconAspectRatio = <T extends HTMLElement>(element: T, aspectRatio: FlexIcon['aspectRatio']) => {
  let value = 1

  const match = aspectRatio?.match(/^([\d\.]+):([\d\.]+)$/)

  if (match) {
    value = Number(match[1]) / Number(match[2])
  }

  element.style.width = `${value}em`

  return element
}

export const injectFontStyle = <T extends HTMLElement>(element: T, fontStyle: FlexText['style']) => {
  if (!fontStyle) return element
  const className = FlexTextStylesClassName[fontStyle] || undefined
  className && element.classList.add(className)
  return element
}

export const injectFontDecoration = <T extends HTMLElement>(element: T, decoration: FlexText['decoration']) => {
  if (!decoration) return element
  const className = FlexTextDecorationClassName[decoration] || undefined
  className && element.classList.add(className)
  return element
}

export const injectSectionStyle = <T extends HTMLElement, U extends HTMLElement | undefined>(
  element: T,
  style: FlexBlockStyle | undefined,
  type: 'header' | 'hero' | 'body' | 'footer',
  parentHTMLElement: U
): [T, U] => {
  if (style) {
    const { separator, separatorColor, backgroundColor } = style
    element = injectColor(element, backgroundColor, 'backgroundColor')
    if (type !== 'header' && separator) {
      const separator = renderSeparator({ type: 'separator', color: separatorColor })
      parentHTMLElement?.appendChild(separator)
    }
  }
  return [element, parentHTMLElement]
}
