# @iamprompt/flex-render

Utility to render LINE Flex Bubble / Carousel JSON for displaying in website.

## Installation

```bash
pnpm add flex-render
```

## Usage

You can input Flex Bubble / Carousel JSON from [Flex Message Simulator](https://developers.line.biz/flex-simulator) directly to `render` function.

```ts
import { render } from '@iamprompt/flex-render'

const flexJSON = {
  type: 'bubble',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Brown Cafe',
        weight: 'bold',
        size: 'xl',
      },
    ],
  },
}

render(flexJSON)
```

**Remark:** Then output of `render` function can be used to render in any framework like React, Vue, Angular, etc. but importantly you need to import CSS file `flex-render/css` in your application.

You can see the example in [apps](../../apps/) directory.

## Bugs

If you find a bug, please file an issue on [our issue tracker on GitHub](https://github.com/iamprompt/flex-render/issues).
