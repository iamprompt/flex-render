import type {
  FlexBox,
  FlexBubble,
  FlexButton,
  FlexCarousel,
  FlexComponent,
  FlexContainer,
  FlexFiller,
  FlexIcon,
  FlexImage,
  FlexSeparator,
  FlexSpan,
  FlexText,
  FlexVideo,
} from '../types'

import {
  FlexBoxLayoutClassName,
  FlexBubbleDirectionClassName,
  FlexBubbleSizeClassName,
  FlexElementClassName,
  FlexSectionClassName,
} from '@/constants/className'
import {
  injectAction,
  injectAlign,
  injectAlignItems,
  injectAspectMode,
  injectAspectRatio,
  injectBackground,
  injectBorderWidth,
  injectButtonStyle,
  injectColor,
  injectCornerRadius,
  injectFlex,
  injectFontDecoration,
  injectFontStyle,
  injectGravity,
  injectIconAspectRatio,
  injectJustifyContent,
  injectMargin,
  injectOffset,
  injectPadding,
  injectPosition,
  injectSectionStyle,
  injectSize,
  injectSpacing,
  injectWeight,
  injectWrap,
  isHorizontalLayout,
  isSizeKeyword,
  isSizeValue,
} from '@/utils/utils'

import { Element } from './dom'
import { FlexSpacer } from '@line/bot-sdk'

export const render = (flexJSON: FlexContainer) => {
  const preview = new Element('div')
  preview.addClassNames('flex-preview')

  if (flexJSON.type === 'carousel') {
    const carousel = renderCarousel(flexJSON as FlexCarousel)
    preview.appendChild(carousel)
  } else {
    const bubble = renderBubble(flexJSON as FlexBubble)
    preview.appendChild(bubble)
  }

  return preview.render()
}

export const renderCarousel = (flexJSON: FlexCarousel) => {
  const carousel = new Element('div')
  carousel.addClassName('lyInner')

  for (const bubbleJSON of flexJSON.contents) {
    const bubble = renderBubble(bubbleJSON)
    bubble.addClassNames('lyItem')
    carousel.appendChild(bubble)
  }

  const carouselWrapper = new Element('div')
  carouselWrapper.addClassName('LySlider')
  carouselWrapper.appendChild(carousel)

  return carouselWrapper
}

export const renderBubble = (flexJSON: FlexBubble) => {
  let bubble = new Element('div')
  bubble.addClassNames('T1', FlexBubbleDirectionClassName[flexJSON.direction || 'ltr'])
  bubble.setAttribute('dir', flexJSON.direction || 'ltr')

  if (flexJSON.header) {
    let header = renderSection('header', flexJSON.header)
    const [headerWithStyle] = injectSectionStyle(header, flexJSON.styles?.header, 'header', bubble)
    header = headerWithStyle
    bubble.appendChild(header)
  }

  if (flexJSON.hero) {
    let hero = renderHero(flexJSON.hero as FlexBox | FlexImage | FlexVideo)
    const [heroWithStyle, heroBubbleStyled] = injectSectionStyle(hero, flexJSON.styles?.hero, 'hero', bubble)
    hero = heroWithStyle
    bubble = heroBubbleStyled
    bubble.appendChild(hero)
  }

  if (flexJSON.body) {
    let body = renderSection('body', flexJSON.body)
    flexJSON.footer && body.addClassNames('ExHasFooter')
    const [bodyWithStyle, bodyBubbleStyled] = injectSectionStyle(body, flexJSON.styles?.body, 'body', bubble)
    body = bodyWithStyle
    bubble = bodyBubbleStyled
    bubble.appendChild(body)
  }

  if (flexJSON.footer) {
    let footer = renderSection('footer', flexJSON.footer)
    const [footerWithStyle, footerBubbleStyled] = injectSectionStyle(footer, flexJSON.styles?.footer, 'footer', bubble)
    footer = footerWithStyle
    bubble = footerBubbleStyled
    bubble.appendChild(footer)
  }

  const bubbleWrapper = new Element('div')
  bubbleWrapper.addClassName(FlexBubbleSizeClassName[flexJSON.size || 'mega'])
  bubbleWrapper.appendChild(bubble)

  return bubbleWrapper
}

export const renderSection = (section: 'header' | 'body' | 'footer', sectionJSON: FlexBox) => {
  const sectionWrapper = new Element('div')
  sectionWrapper.addClassNames(FlexSectionClassName[section])

  const boxContent = renderBox(sectionJSON)
  sectionWrapper.appendChild(boxContent)

  return sectionWrapper
}

export const renderHero = (heroJSON: FlexBox | FlexImage | FlexVideo) => {
  const hero = new Element('div')
  hero.addClassNames(FlexSectionClassName['hero'])

  const heroContent = renderContent(heroJSON)
  if (heroContent) {
    hero.appendChild(heroContent)
  }

  return hero
}

export const renderBox = (boxJSON: FlexBox, parent?: FlexComponent) => {
  let box = new Element('div')

  if (boxJSON.contents) {
    for (const contentJSON of boxJSON.contents) {
      const content = renderContent(contentJSON, boxJSON)
      if (!content) continue
      box.appendChild(content)
    }
  }

  box.addClassNames(FlexElementClassName.box, ...FlexBoxLayoutClassName[boxJSON.layout || 'vertical'].split(' '))

  box = injectPosition(box, boxJSON.position)
  box = boxJSON.height || boxJSON.width ? injectFlex(box, 0) : injectFlex(box, boxJSON.flex)
  box = injectSpacing(box, boxJSON.spacing)
  box = injectMargin(box, boxJSON.margin, parent)
  box = injectSize(box, boxJSON.width, 'width')
  box = injectSize(box, boxJSON.height, 'height')
  box = injectSize(box, boxJSON.maxWidth, 'maxWidth')
  box = injectSize(box, boxJSON.maxHeight, 'maxHeight')
  box = injectColor(box, boxJSON.backgroundColor, 'backgroundColor')
  box = injectBorderWidth(box, boxJSON.borderWidth)
  box = injectColor(box, boxJSON.borderColor, 'borderColor')
  box = injectCornerRadius(box, boxJSON.cornerRadius)
  box = injectJustifyContent(box, boxJSON.justifyContent)
  box = injectAlignItems(box, boxJSON.alignItems)
  box = injectOffset(box, boxJSON)
  box = injectPadding(box, boxJSON)
  box = injectBackground(box, boxJSON.background)

  return box
}

export const renderContent = (contentJSON: FlexComponent, parent?: FlexComponent) => {
  switch (contentJSON.type) {
    case 'box':
      return renderBox(contentJSON as FlexBox, parent)
    case 'button':
      return renderButton(contentJSON as FlexButton, parent)
    case 'image':
      return renderImage(contentJSON as FlexImage, parent)
    case 'video':
      return renderVideo(contentJSON as FlexVideo, parent)
    case 'icon':
      return renderIcon(contentJSON as FlexIcon, parent)
    case 'text':
      return renderText(contentJSON as FlexText, parent)
    case 'span':
      return renderSpan(contentJSON as FlexSpan, parent)
    case 'separator':
      return renderSeparator(contentJSON as FlexSeparator, parent)
    case 'filler':
      return renderFiller(contentJSON as FlexFiller, parent)
    case 'spacer':
      return renderSpacer(contentJSON as FlexSpacer, parent)
    default:
      return null
  }
}

export const renderButton = (buttonJSON: FlexButton, parent?: FlexComponent) => {
  let button = new Element('div')
  button.addClassNames(FlexElementClassName.button)

  if (buttonJSON.action) {
    let actionWrapper = new Element('a')
    actionWrapper = injectColor(
      actionWrapper,
      buttonJSON.color,
      buttonJSON.style === 'primary' || buttonJSON.style === 'secondary' ? 'backgroundColor' : 'color',
    )
    const actionContent = new Element('div')
    actionContent.setTextContent(buttonJSON.action.label)
    actionWrapper.appendChild(actionContent)
    actionWrapper = injectAction(actionWrapper, buttonJSON.action)
    button.appendChild(actionWrapper)
  }

  button = injectFlex(button, buttonJSON.flex)
  button = injectPosition(button, buttonJSON.position)
  button = injectMargin(button, buttonJSON.margin, parent)
  button = injectSize(button, buttonJSON.height, 'height')
  button = injectButtonStyle(button, buttonJSON.style || 'link')
  button = injectGravity(button, buttonJSON.gravity)
  button = injectOffset(button, buttonJSON)

  return button
}

export const renderImage = (imageJSON: FlexImage, parent?: FlexComponent) => {
  let image = new Element('div')
  image.addClassNames(FlexElementClassName.image)

  image = injectFlex(image, imageJSON.flex)
  image = injectPosition(image, imageJSON.position)
  image = injectMargin(image, imageJSON.margin, parent)
  image = injectAlign(image, imageJSON.align)
  image = injectGravity(image, imageJSON.gravity)
  if (isSizeKeyword(imageJSON.size || 'md')) {
    image = injectSize(image, imageJSON.size || 'md')
  }
  image = injectAspectMode(image, imageJSON.aspectMode || 'fit')
  image = injectOffset(image, imageJSON)

  let imageContent = new Element('span')
  imageContent.setStyle('background-image', `url("${imageJSON.url}")`)
  imageContent = injectColor(imageContent, imageJSON.backgroundColor, 'backgroundColor')

  let imageInner = new Element('a')
  imageInner = injectAspectRatio(imageInner, imageJSON.aspectRatio)
  imageInner = injectAction(imageInner, imageJSON.action)

  imageInner.appendChild(imageContent)

  let imageWrapper = new Element('div')
  if (isSizeValue(imageJSON.size || 'md')) {
    imageWrapper = injectSize(imageWrapper, imageJSON.size, isHorizontalLayout(parent) ? 'width' : 'height')
  }
  imageWrapper.appendChild(imageInner)
  image.appendChild(imageWrapper)

  // console.log(image)

  return image
}

export const renderIcon = (iconJSON: FlexIcon, parent?: FlexComponent) => {
  let icon = new Element('div')
  icon.addClassNames(FlexElementClassName.icon)

  let iconContent = new Element('span')
  iconContent.setStyle('background-image', `url(${iconJSON.url})`)

  icon = injectPosition(icon, iconJSON.position)
  icon = injectMargin(icon, iconJSON.margin, parent)
  icon = injectSize(icon, iconJSON.size)
  iconContent = injectIconAspectRatio(iconContent, iconJSON.aspectRatio)
  icon = injectOffset(icon, iconJSON)
  icon = injectFlex(icon, 0)

  let iconInner = new Element('div')
  iconInner.appendChild(iconContent)
  icon.appendChild(iconInner)

  return icon
}

export const renderText = (textJSON: FlexText, parent?: FlexComponent) => {
  let text = new Element('div')
  text.addClassNames(FlexElementClassName.text)

  if (textJSON.contents && textJSON.contents.length > 0) {
    for (const contentJSON of textJSON.contents) {
      const content = renderContent(contentJSON, textJSON)
      if (!content) continue
      text.appendChild(content)
    }
  } else if (textJSON.text) {
    const textContent = new Element('p')
    textContent.setTextContent(textJSON.text)
    if (textJSON.action) {
      let actionWrapper = new Element('a')
      actionWrapper = injectAction(actionWrapper, textJSON.action)
      actionWrapper.appendChild(textContent)
      text.appendChild(actionWrapper)
    } else {
      text.appendChild(textContent)
    }
  }

  text = injectFlex(text, textJSON.flex)
  text = injectMargin(text, textJSON.margin, parent)
  text = injectSize(text, textJSON.size, 'fontSize')
  text = injectSize(text, textJSON.lineSpacing, 'lineHeight')
  text = injectColor(text, textJSON.color, 'color')
  text = injectWeight(text, textJSON.weight)
  text = injectFontStyle(text, textJSON.style)
  text = injectFontDecoration(text, textJSON.decoration)
  text = injectPosition(text, textJSON.position)
  text = injectAlign(text, textJSON.align)
  text = injectGravity(text, textJSON.gravity)
  text = injectWrap(text, textJSON.wrap)
  text = injectOffset(text, textJSON)

  return text
}

export const renderSpan = (spanJSON: FlexSpan, parent?: FlexComponent) => {
  let span = new Element('span')
  span.addClassNames(FlexElementClassName.span)
  span.setTextContent(spanJSON.text)

  span = injectSize(span, spanJSON.size, 'fontSize')
  span = injectColor(span, spanJSON.color, 'color')
  span = injectWeight(span, spanJSON.weight)
  span = injectFontStyle(span, spanJSON.style)
  span = injectFontDecoration(span, spanJSON.decoration)

  return span
}

export const renderSeparator = (separatorJSON: FlexSeparator, parent?: FlexComponent) => {
  let separator = new Element('div')
  separator.addClassNames(FlexElementClassName.separator)

  separator = injectMargin(separator, separatorJSON.margin, parent)
  separator = injectColor(separator, separatorJSON.color, 'borderColor')

  return separator
}

export const renderFiller = (fillerJSON: FlexFiller, parent?: FlexComponent) => {
  let filler = new Element('div')
  filler.addClassNames(FlexElementClassName.filler)
  filler = injectFlex(filler, fillerJSON.flex)
  return filler
}

export const renderVideo = (videoJSON: FlexVideo, parent?: FlexComponent) => {
  const video = new Element('div')
  video.addClassNames(FlexElementClassName.video)

  if (videoJSON.altContent) {
    const altContent = renderContent(videoJSON.altContent)
    if (altContent) {
      video.appendChild(altContent)
    }
  }

  return video
}

export const renderSpacer = (spacerJSON: FlexSpacer, parent?: FlexComponent) => {
  let spacer = new Element('div')
  spacer.addClassNames(FlexElementClassName.spacer)

  spacer = injectFlex(spacer, 0)
  spacer = injectSpacing(spacer, spacerJSON.size || 'md')

  return spacer
}
