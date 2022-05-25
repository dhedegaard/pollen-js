import { ParsedXMLStructure } from './parser'
import { renderToString } from 'react-dom/server'
import Index from './pages'

export const renderDataToHTML = (
  data: ParsedXMLStructure[] | undefined,
  cacheTimestamp: Date | undefined
): string => {
  const html = renderToString(
    <Index data={data} cacheTimestamp={cacheTimestamp} />
  )
  return `<!doctype html>${html}`
}
