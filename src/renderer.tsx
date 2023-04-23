import { renderToStaticMarkup } from 'react-dom/server'
import Index from './pages'
import { ParsedXMLStructure } from './parser'

export const renderDataToHTML = (
  data: ParsedXMLStructure[] | undefined,
  cacheTimestamp: Date | undefined
): string => {
  const html = renderToStaticMarkup(
    <Index data={data} cacheTimestamp={cacheTimestamp} />
  )
  return `<!doctype html>${html}`
}
