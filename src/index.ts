import { PromiseType } from 'utility-types'
import './app'
import { fetchAndParse } from './parser'
import { renderDataToHTML } from './renderer'

export let data: PromiseType<ReturnType<typeof fetchAndParse>> | undefined
export let cacheTimestamp: Date | undefined
export let renderedData: string

export const refreshData = async () => {
  renderedData = renderDataToHTML(undefined, undefined)
  console.log('Refreshing data.')
  try {
    const innerData = await fetchAndParse()
    // Rerender and update the global state.
    cacheTimestamp = new Date()
    renderedData = renderDataToHTML(innerData, cacheTimestamp)
    // Mark the global state as new.
    data = innerData
    return renderedData
  } catch (error) {
    console.log('Error refreshing data:')
    console.error(error)
    throw error
  }
}

if (require.main === module) {
  setInterval(refreshData, 10 * 60 * 1000)
  refreshData()
}
