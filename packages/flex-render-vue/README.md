# @iamprompt/flex-render

Utility to render LINE Flex Bubble / Carousel JSON for displaying in website.

## Installation

```bash
pnpm add flex-render-vue
```

## Usage

You can input Flex Bubble / Carousel JSON from [Flex Message Simulator](https://developers.line.biz/flex-simulator) directly to `FlexPreview` component.

```vue
import "@iamprompt/flex-render/vue/css";

import { FlexPreview } from "@iamprompt/flex-render/vue";

const flexJSON = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "Brown Cafe",
        "weight": "bold",
        "size": "xl"
      }
    ]
  }
}

<FlexPreview :json="flexJSON" />
```

You can see the example in [apps](../../apps/) directory.

## Bugs

If you find a bug, please file an issue on [our issue tracker on GitHub](https://github.com/iamprompt/flex-render/issues).