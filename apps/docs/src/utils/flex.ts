import samples from '@/assets/samples.json'

const FileNameRegex = /([^/]+)\.json$/

const FlexModulesGlob = import.meta.glob(`../assets/flex/*.json`, {
  eager: true,
})
export const FlexModules = Object.entries(FlexModulesGlob).map(
  ([path, module]) => {
    const key = path.match(FileNameRegex)?.[1] ?? ''
    const sample = samples.find((sample) => sample.id === key)
    return {
      json: (module as any).default,
      id: key,
      title: key,
      pictureUrl: '',
      author: 'unknown',
      authorUrl: '',
      ...sample,
    }
  },
)
