import express from 'express'
import { renderedData } from '.'
import api from './api'

const app = express()

app.use('/static', express.static('static'))
app.use('/static/fonts', express.static('node_modules/typeface-roboto/files'))

app.get('/', async (request, response) =>
  response.contentType('html').end(renderedData)
)

api(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port: ${port}`))
