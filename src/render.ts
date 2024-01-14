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
  FlexSpacer,
  FlexSpan,
  FlexText,
  FlexVideo,
} from '@line/bot-sdk'
import {
  getDocument,
  injectAlign,
  injectAlignItems,
  injectAspectMode,
  injectFlex,
  injectGravity,
  injectAspectRatio,
  injectSize,
  injectJustifyContent,
  injectMargin,
  injectOffset,
  injectPadding,
  injectPosition,
  injectSpacing,
  injectWeight,
  injectButtonStyle,
  injectColor,
  injectWrap,
  injectBorderWidth,
  injectCornerRadius,
  injectBackground,
  injectIconAspectRatio,
  injectFontStyle,
  injectFontDecoration,
  injectSectionStyle,
} from './utils'
import {
  FlexBoxLayoutClassName,
  FlexBubbleDirectionClassName,
  FlexBubbleSizeClassName,
  FlexElementClassName,
  FlexSectionClassName,
} from './className'

export const render = (flexJSON: FlexContainer) => {
  const document = getDocument()
  const preview = document.createElement('div')
  preview.classList.add('flex-preview')

  if (flexJSON.type === 'carousel') {
    const carousel = renderCarousel(flexJSON)
    preview.appendChild(carousel)
  } else {
    const bubble = renderBubble(flexJSON)
    preview.appendChild(bubble)
  }

  return preview.outerHTML
}

export const renderCarousel = (flexJSON: FlexCarousel) => {
  const document = getDocument()

  const carousel = document.createElement('div')
  carousel.classList.add('lyInner')

  for (const bubbleJSON of flexJSON.contents) {
    const bubble = renderBubble(bubbleJSON)
    bubble.classList.add('lyItem')
    carousel.appendChild(bubble)
  }

  const carouselWrapper = document.createElement('div')
  carouselWrapper.className = 'LySlider'
  carouselWrapper.appendChild(carousel)

  return carouselWrapper
}

export const renderBubble = (flexJSON: FlexBubble) => {
  const document = getDocument()

  let bubble = document.createElement('div')
  bubble.classList.add('T1', FlexBubbleDirectionClassName[flexJSON.direction || 'ltr'])
  bubble.dir = flexJSON.direction || 'ltr'

  if (flexJSON.header) {
    let header = renderSection('header', flexJSON.header)
    const [headerWithStyle] = injectSectionStyle(header, flexJSON.styles?.header, 'header', bubble)
    header = headerWithStyle
    bubble.appendChild(header)
  }

  if (flexJSON.hero) {
    let hero = renderHero(flexJSON.hero)
    const [heroWithStyle, heroBubbleStyled] = injectSectionStyle(hero, flexJSON.styles?.hero, 'hero', bubble)
    hero = heroWithStyle
    bubble = heroBubbleStyled
    bubble.appendChild(hero)
  }

  if (flexJSON.body) {
    let body = renderSection('body', flexJSON.body)
    flexJSON.footer && body.classList.add('ExHasFooter')
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

  const bubbleWrapper = document.createElement('div')
  bubbleWrapper.classList.add(FlexBubbleSizeClassName[flexJSON.size || 'mega'])
  bubbleWrapper.appendChild(bubble)

  return bubbleWrapper
}

export const renderSection = (section: 'header' | 'body' | 'footer', sectionJSON: FlexBox) => {
  const document = getDocument()

  const sectionWrapper = document.createElement('div')
  sectionWrapper.classList.add(FlexSectionClassName[section])

  const boxContent = renderBox(sectionJSON)
  sectionWrapper.appendChild(boxContent)

  return sectionWrapper
}

export const renderHero = (heroJSON: FlexBox | FlexImage | FlexVideo) => {
  const document = getDocument()

  const hero = document.createElement('div')
  hero.classList.add(FlexSectionClassName['hero'])

  const heroContent = renderContent(heroJSON)
  if (heroContent) {
    hero.appendChild(heroContent)
  }

  return hero
}

export const renderBox = (boxJSON: FlexBox, parent?: FlexComponent) => {
  const document = getDocument()

  let box = document.createElement('div')

  if (boxJSON.contents) {
    for (const contentJSON of boxJSON.contents) {
      const content = renderContent(contentJSON, boxJSON)
      if (!content) continue
      box.appendChild(content)
    }
  }

  box.classList.add(FlexElementClassName.box, ...FlexBoxLayoutClassName[boxJSON.layout || 'vertical'].split(' '))

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

export const renderContent = (contentJSON: FlexBox['contents'][number], parent?: FlexComponent) => {
  switch (contentJSON.type) {
    case 'box':
      return renderBox(contentJSON, parent)
    case 'button':
      return renderButton(contentJSON, parent)
    case 'image':
      return renderImage(contentJSON, parent)
    case 'video':
      return renderVideo(contentJSON, parent)
    case 'icon':
      return renderIcon(contentJSON, parent)
    case 'text':
      return renderText(contentJSON, parent)
    case 'span':
      return renderSpan(contentJSON, parent)
    case 'separator':
      return renderSeparator(contentJSON, parent)
    case 'filler':
      return renderFiller(contentJSON, parent)
    case 'spacer':
      return renderSpacer(contentJSON, parent)
    default:
      return null
  }
}

export const renderButton = (buttonJSON: FlexButton, parent?: FlexComponent) => {
  const document = getDocument()

  let button = document.createElement('div')
  button.classList.add(FlexElementClassName.button)

  if (buttonJSON.action) {
    let actionWrapper = document.createElement('a')
    actionWrapper = injectColor(
      actionWrapper,
      buttonJSON.color,
      buttonJSON.style === 'primary' || buttonJSON.style === 'secondary' ? 'backgroundColor' : 'color'
    )
    const actionContent = document.createElement('div')
    actionContent.textContent = buttonJSON.action.label
    actionWrapper.appendChild(actionContent)
    if (buttonJSON.action.type === 'uri') {
      actionWrapper.target = '_blank'
      actionWrapper.href = buttonJSON.action.uri
    }
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
  const document = getDocument()

  let image = document.createElement('div')
  image.classList.add(FlexElementClassName.image)

  image = injectFlex(image, imageJSON.flex)
  image = injectPosition(image, imageJSON.position)
  image = injectMargin(image, imageJSON.margin, parent)
  image = injectAlign(image, imageJSON.align)
  image = injectGravity(image, imageJSON.gravity)
  image = injectSize(image, imageJSON.size || 'md')
  image = injectAspectMode(image, imageJSON.aspectMode || 'fit')
  image = injectOffset(image, imageJSON)

  let imageContent = document.createElement('span')
  imageContent.style.setProperty('background-image', `url("${imageJSON.url}")`)
  imageContent = injectColor(imageContent, imageJSON.backgroundColor, 'backgroundColor')

  let imageInner = document.createElement('a')
  imageInner = injectAspectRatio(imageInner, imageJSON.aspectRatio)

  imageInner.appendChild(imageContent)

  let imageWrapper = document.createElement('div')
  imageWrapper.appendChild(imageInner)
  image.appendChild(imageWrapper)

  return image
}

export const renderIcon = (iconJSON: FlexIcon, parent?: FlexComponent) => {
  const document = getDocument()

  let icon = document.createElement('div')
  icon.classList.add(FlexElementClassName.icon)

  let iconContent = document.createElement('span')
  iconContent.style.setProperty('background-image', `url(${iconJSON.url})`)

  icon = injectPosition(icon, iconJSON.position)
  icon = injectMargin(icon, iconJSON.margin, parent)
  icon = injectSize(icon, iconJSON.size)
  iconContent = injectIconAspectRatio(iconContent, iconJSON.aspectRatio)
  icon = injectOffset(icon, iconJSON)
  icon = injectFlex(icon, 0)

  let iconInner = document.createElement('div')
  iconInner.appendChild(iconContent)
  icon.appendChild(iconInner)

  return icon
}

export const renderText = (textJSON: FlexText, parent?: FlexComponent) => {
  const document = getDocument()

  let text = document.createElement('div')
  text.classList.add(FlexElementClassName.text)

  if (textJSON.contents && textJSON.contents.length > 0) {
    for (const contentJSON of textJSON.contents) {
      const content = renderContent(contentJSON, textJSON)
      if (!content) continue
      text.appendChild(content)
    }
  } else if (textJSON.text) {
    const textContent = document.createElement('p')
    textContent.textContent = textJSON.text
    text.appendChild(textContent)
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
  const document = getDocument()

  let span = document.createElement('span')
  span.classList.add(FlexElementClassName.span)
  span.textContent = spanJSON.text

  span = injectSize(span, spanJSON.size, 'fontSize')
  span = injectColor(span, spanJSON.color, 'color')
  span = injectWeight(span, spanJSON.weight)
  span = injectFontStyle(span, spanJSON.style)
  span = injectFontDecoration(span, spanJSON.decoration)

  return span
}

export const renderSeparator = (separatorJSON: FlexSeparator, parent?: FlexComponent) => {
  const document = getDocument()

  let separator = document.createElement('div')
  separator.classList.add(FlexElementClassName.separator)

  separator = injectMargin(separator, separatorJSON.margin, parent)
  separator = injectColor(separator, separatorJSON.color, 'borderColor')

  return separator
}

export const renderFiller = (fillerJSON: FlexFiller, parent?: FlexComponent) => {
  const document = getDocument()
  let filler = document.createElement('div')
  filler.classList.add(FlexElementClassName.filler)
  filler = injectFlex(filler, fillerJSON.flex)
  return filler
}

export const renderVideo = (videoJSON: FlexVideo, parent?: FlexComponent) => {
  const document = getDocument()

  const video = document.createElement('div')
  video.classList.add(FlexElementClassName.video)

  if (videoJSON.altContent) {
    const altContent = renderContent(videoJSON.altContent)
    if (altContent) {
      video.appendChild(altContent)
    }
  }

  return video
}

export const renderSpacer = (spacerJSON: FlexSpacer, parent?: FlexComponent) => {
  const document = getDocument()

  let spacer = document.createElement('div')
  spacer.classList.add(FlexElementClassName.spacer)

  spacer = injectFlex(spacer, 0)
  spacer = injectSpacing(spacer, spacerJSON.size || 'md')

  return spacer
}
