import express from 'express'
import { data } from '.'

const app = express()

app.get('/api', async (request, response) => {
  try {
    return response.send(data)
  } catch (error) {
    console.error(error)
    return response.status(500).send('Internal server error')
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port: ${port}`))
