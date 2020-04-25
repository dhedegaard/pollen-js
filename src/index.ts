import { PromiseType } from 'utility-types'
import './app'
import { fetchAndParse } from './parser'
import { renderDataToHTML } from './renderer'

export let data: PromiseType<ReturnType<typeof fetchAndParse>> | undefined
export let cacheTimestamp: Date | undefined
export let renderedData: string

const refreshData = async () => {
  renderedData = renderDataToHTML(undefined, undefined)
  console.log('Refreshing data.')
  try {
    data = await fetchAndParse()
    cacheTimestamp = new Date()
    // Re-render some new markup.
    renderedData = renderDataToHTML(data, cacheTimestamp)
  } catch (error) {
    console.log('Error refreshing data:')
    console.error(error)
  }
}

setInterval(refreshData, 10 * 60 * 1000)
refreshData()
