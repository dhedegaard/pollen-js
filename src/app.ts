import express from 'express'
import { cacheTimestamp, data } from '.'

const app = express()

app.use('/static', express.static('static'))

app.set('view engine', 'pug')

app.get('/', async (request, response) => {
  response.render('index', {
    data,
    cacheTimestamp
  })
})

app.get('/api', async (request, response) => {
  try {
    return response.send({
      data,
      cacheTimestamp
    })
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal server error')
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port: ${port}`))
