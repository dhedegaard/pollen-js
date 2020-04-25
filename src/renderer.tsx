import { ParsedXMLStructure } from './parser'
import { ServerStyleSheets } from '@material-ui/core'
import ReactDOMServer from 'react-dom/server'
import React from 'react'
import Index from './pages'
import { minify } from 'csso'
import { ServerStyleSheet } from 'styled-components'

export const renderDataToHTML = (
  data: ParsedXMLStructure[] | undefined,
  cacheTimestamp: Date | undefined
): string => {
  const sheets = new ServerStyleSheets()
  const styledSheets = new ServerStyleSheet()

  try {
    // Render the HTML, capture the CSS for later.
    const html = ReactDOMServer.renderToString(
      sheets.collect(
        styledSheets.collectStyles(
          <Index data={data} cacheTimestamp={cacheTimestamp} />
        )
      )
    )

    // Capture and minifiy the CSS.
    const { css } = minify(sheets.toString())
    const styledTags = styledSheets.getStyleTags()

    // Return the complete HTML document.
    return `<!doctype html>${html
      .replace('</head>', `<style>${css}</style></head>`)
      .replace('</head>', `${styledTags}</head>`)}`
  } finally {
    styledSheets.seal()
  }
}
