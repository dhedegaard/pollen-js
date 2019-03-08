import { PromiseType } from 'utility-types'
import './app'
import { fetchAndParse } from './parser'

export let data: PromiseType<ReturnType<typeof fetchAndParse>> | undefined
export let cacheTimestamp: Date | undefined

const refreshData = async () => {
  console.log('Refreshing data.')
  try {
    data = await fetchAndParse()
    cacheTimestamp = new Date()
  } catch (error) {
    console.log('Error refreshing data:')
    console.error(error)
  }
}

setInterval(refreshData, 10 * 60 * 1000)
refreshData()
