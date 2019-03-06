import { fetchAndParse } from './parser'
import { PromiseType } from 'utility-types'
import './app'

export let data: PromiseType<ReturnType<typeof fetchAndParse>> | undefined

const refreshData = async () => {
  console.log('Refreshing data.')
  try {
    data = await fetchAndParse()
  } catch (error) {
    console.log('Error refreshing data:')
    console.error(error)
  }
}

setInterval(refreshData, 10 * 60 * 1000)
refreshData()
