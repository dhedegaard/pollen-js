import express from 'express'
import expressGraphql = require('express-graphql')
import { buildSchema } from 'graphql'
import { cacheTimestamp, data } from '.'

const schema = buildSchema(`
"""
A data value for a given type of pollen, for a given city
"""
type DataValue {
  """
  The type of pollen
  """
  type: String!
  """
  The amount of that pollen per square meter
  """
  value: Int
}

"""
Data for a given city, whose name is found in the city field
"""
type DataElem {
  """
  The city, that the measurement is from
  """
  city: String!
  """
  The text forecast provided for the city
  """
  forecast: String
  """
  The separate pollen values for each type of pollen
  """
  values: [DataValue!]!
}

type Query {
  """
  When the data is from, as a ISO8601 string
  """
  cacheTimestamp: String
  """
  The currently available data, for the various cities
  """
  data: [DataElem!]
}
`)

const resolver = {
  data: () => {
    if (data == null) {
      return data
    }
    return data.map(city => ({
      ...city,
      values: Object.entries(city.values).map(([key, value]) => ({
        type: key,
        value: value < 0 ? null : value
      }))
    }))
  },
  cacheTimestamp: () =>
    cacheTimestamp == null ? cacheTimestamp : cacheTimestamp.toISOString()
}

export default (app: express.Express) => {
  app.use(
    '/graphql',
    expressGraphql({
      schema,
      rootValue: resolver,
      graphiql: true
    })
  )
}
