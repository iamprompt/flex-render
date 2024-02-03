import { camelCaseToKebabCase } from './utils'

export class Element {
  private tagName: string
  private attributes: Record<string, string>
  private className: string[]
  private style: Record<string, string>
  private children: Element[]
  private textContent: string | undefined

  constructor(
    tagName: string,
    attributes: Record<string, string> = {},
    className: string[] = [],
    style: Record<string, string> = {},
    children: Element[] = [],
    textContent: string | undefined = undefined,
  ) {
    this.tagName = tagName
    this.attributes = attributes
    this.className = className
    this.style = style
    this.children = children
    this.textContent = textContent
  }

  public getTagName(): string {
    return this.tagName
  }

  public setTextContent(textContent?: string): void {
    this.textContent = textContent || undefined
  }

  public getTextContent(): string | undefined {
    return this.textContent
  }

  public removeTextContent(): void {
    this.textContent = undefined
  }

  public getAttribute(key: string): string | undefined {
    return this.attributes[key]
  }

  public setAttribute(key: string, value: string): void {
    this.attributes[key] = value
  }

  public removeAttribute(key: string): void {
    delete this.attributes[key]
  }

  public getClassName(): string[] {
    return this.className
  }

  public addClassName(value: string): void {
    this.className.push(value)
  }

  public addClassNames(...values: string[]): void {
    this.className.push(...values)
  }

  public removeClassName(value: string): void {
    this.className = this.className.filter((className) => className !== value)
  }

  public getStyle(): Record<string, string> {
    return this.style
  }

  public setStyle(key: string, value: string): void {
    this.style[key] = value
  }

  public removeStyle(key: string): void {
    delete this.style[key]
  }

  public appendChild(child: Element): void {
    this.children.push(child)
  }

  public render(): string {
    const attributes = Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')
    const className = this.className.join(' ')
    const style = Object.entries(this.style)
      .map(
        ([key, value]) =>
          `${camelCaseToKebabCase(key)}:${value.replace(/"/g, '').replace(/,/g, ';').replace(/\//g, '/')}`,
      )
      .join(';')

    const tagAttributes = `${attributes !== '' ? attributes : ''} ${
      className !== '' ? `class="${className}"` : ''
    } ${style !== '' ? `style="${style}"` : ''}`.trim()

    const children = this.children.map((child) => child.render()).join('')
    return `<${this.tagName}${tagAttributes !== '' ? ` ${tagAttributes}` : ''}>${children !== '' ? children : this.textContent || ''}</${this.tagName}>`
  }
}
