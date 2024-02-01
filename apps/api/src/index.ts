import { render } from '@iamprompt/flex-render'
import type { FlexContainer } from '@line/bot-sdk'
import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/render', (req, res) => {
  const body = req.body as FlexContainer
  const html = render(body)
  res.json({ html })
})

app.listen(3030, () => {
  console.log('Listening on port 3030')
})
