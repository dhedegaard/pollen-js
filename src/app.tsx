import express from 'express'
import { cacheTimestamp, data } from '.'
import api from './api'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Index from './pages'

const app = express()

app.use('/static', express.static('static'))

app.get('/', async (request, response) => {
  response.contentType('html').write('<!doctype html>')
  ReactDOMServer.renderToStaticNodeStream(
    <Index data={data} cacheTimestamp={cacheTimestamp} />
  ).pipe(response)
})

api(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port: ${port}`))
