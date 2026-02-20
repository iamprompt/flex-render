import samples from '@/assets/samples.json'

const FileNameRegex = /([^/]+)\.json$/

export interface FlexModule {
  id: string
  title: string
  category: string
  icon: string
  pictureUrl: string
  author: string
  authorUrl: string
  json: any
}

const FlexModulesGlob = import.meta.glob(`../assets/flex/*.json`, {
  eager: true,
})

export const FlexModules: FlexModule[] = Object.entries(FlexModulesGlob).map(([path, module]) => {
  const key = FileNameRegex.exec(path)?.[1] ?? ''
  const sample = samples.find((sample) => sample.id === key)
  return {
    json: (module as any).default,
    id: key,
    title: key,
    pictureUrl: '',
    author: 'unknown',
    authorUrl: '',
    category: 'Uncategorized',
    icon: 'article',
    ...sample,
  }
})

/** Category display order */
const CATEGORY_ORDER = [
  'E-Commerce',
  'Food & Dining',
  'Bookings',
  'Travel',
  'Events & Entertainment',
  'Social',
  'Finance & Payments',
  'Sports',
  'Design',
  'Utility',
  'Uncategorized',
]

export interface CategoryGroup {
  name: string
  items: FlexModule[]
}

export function groupByCategory(modules: FlexModule[]): CategoryGroup[] {
  const map = new Map<string, FlexModule[]>()

  for (const mod of modules) {
    const cat = mod.category || 'Uncategorized'
    if (!map.has(cat)) map.set(cat, [])
    map.get(cat)!.push(mod)
  }

  return CATEGORY_ORDER
    .filter((cat) => map.has(cat))
    .map((cat) => ({ name: cat, items: map.get(cat)! }))
}
