import express from 'express'
import { renderedData } from '.'
import api from './api'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()

app.use(helmet())
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'short'))

app.use('/static', express.static('static'))
app.use('/static/fonts', express.static('node_modules/typeface-roboto/files'))

app.get('/', async (request, response) =>
  response.contentType('html').end(renderedData)
)

api(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port: ${port}`))
