# @iamprompt/flex-render

Utility to render LINE Flex Bubble / Carousel JSON for displaying in website.

## Installation

```bash
pnpm add @iamprompt/flex-render
```

## Usage

You can input Flex Bubble / Carousel JSON from [Flex Message Simulator](https://developers.line.biz/flex-simulator) directly to `render` function / `FlexPreview` component.

```ts
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
```

### Node.js

```ts
import { render } from '@iamprompt/flex-render';

render(flexJSON)
```

### React

```tsx
import { FlexPreview } from '@iamprompt/flex-render/react';

<FlexPreview json={flexJSON} />
```

### Vue

```vue
import { FlexPreview } from '@iamprompt/flex-render/vue';

<FlexPreview :json="flexJSON" />
```

You can see the example in [apps](../../apps/) directory.

## Bugs

If you find a bug, please file an issue on [our issue tracker on GitHub](https://github.com/iamprompt/flex-render/issues).