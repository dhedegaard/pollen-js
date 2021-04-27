import express from 'express'
import { renderedData } from '.'
import api from './api'
import helmet from 'helmet'
import morgan from 'morgan'

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
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'short'))

app.get('/', async (_request, response) =>
  response.contentType('html').end(renderedData)
)

app.use('/', express.static('static'))

api(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port: ${port}`))
