import { h } from 'vue'

import { render } from '@/utils/render'

const FlexPreview = {
  props: {
    json: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    return () => h('div', { innerHTML: render(props.json) })
  },
}

export default FlexPreview
