import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { data, renderedData } from '.'
import api from './api'

const app = express()

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': "'self'",
        'script-src': "'unsafe-inline' 'self'",
        'img-src': "'self' data:",
        'style-src': "'unsafe-inline'",
      },
    },
  })
)
app.use(compression())
app.use(morgan(process.env['NODE_ENV'] === 'development' ? 'dev' : 'short'))

app.get('/', async (_request, response) => {
  // If the data is not available yet, wait for it to exist before returning a response.
  while (data == null) {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  return response.contentType('html').end(renderedData)
})

app.get('/data', async (_request, response) => {
  // If the data is not available yet, wait for it to exist before returning a response.
  while (data == null) {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  return response.json(data)
})

app.use('/', express.static('static'))

api(app)

const port = process.env['PORT'] || 3000
app.listen(port, () => console.log(`Listening on port: ${port}`))
