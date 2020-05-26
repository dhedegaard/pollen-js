import express from 'express'
import { renderedData } from '.'
import api from './api'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()

app.use(helmet())
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'short'))

app.get('/', async (request, response) =>
  response.contentType('html').end(renderedData)
)

app.use('/', express.static('static'))

api(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port: ${port}`))
