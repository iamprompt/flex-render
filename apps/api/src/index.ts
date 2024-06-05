import express from 'express'
import { type FlexContainer, render } from 'flex-render'

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
