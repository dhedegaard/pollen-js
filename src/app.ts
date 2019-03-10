import express from 'express'
import expressGraphql from 'express-graphql'
import { cacheTimestamp, data } from '.'
import api from './api'

const app = express()

app.use('/static', express.static('static'))

app.set('view engine', 'pug')

app.get('/', async (request, response) => {
  response.render('index', {
    data,
    cacheTimestamp
  })
})

api(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port: ${port}`))
