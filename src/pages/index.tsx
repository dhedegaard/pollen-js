import React from 'react'
import { ParsedXMLStructure } from '../parser'
import ValueItem from '../components/ValueItem'

type Props = {
  data: ParsedXMLStructure[] | undefined
  cacheTimestamp: Date | undefined
}
const Index: React.FC<Props> = (props) => (
  <html lang="en" prefix="og: http://ogp.me/ns#">
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#FFFFFF" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta httpEquiv="refresh" content="600" />
      <meta property="og:site_name" content="Pollen" />
      <meta property="og:url" content="https://pollen.dhedegaard.dk/" />
      <meta property="og:title" content="Pollen" />
      <meta
        property="og:description"
        content={
          props.data?.map((e) => `${e.city}: ${e.forecast}`).join(' - ') ?? ''
        }
      />
      <meta property="og:image" content="/static/favicon.png" />
      <title>Pollen</title>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="manifest" href="/static/manifest.json" />
      <link rel="apple-touch-icon" href="/static/favicon.png" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
    </head>
    <body>
      <nav
        className="navbar navbar-light"
        style={{
          backgroundColor: '#acf8ac',
        }}
      >
        <div className="container">
          <span className="navbar-brand text-left">
            <img
              src="/static/favicon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Pollen icon"
            />
            <span>Pollen</span>
          </span>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          {props.data?.map((elem) => (
            <div className="col" key={elem.city}>
              <div className="card">
                <h5 className="card-header">{elem.city}</h5>
                <ul className="list-group list-group-flush">
                  {Object.entries(elem.values).map(([index, val]) => (
                    <li key={index} className="list-group-item">
                      <small>{index}: </small>
                      <ValueItem value={val} />
                    </li>
                  ))}
                  {elem.forecast !== '' && (
                    <li className="list-group-item">
                      <small className="text-muted">{elem.forecast}</small>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="row text-right">
          <div className="col">
            <small className="text-muted">
              {props.cacheTimestamp != null && (
                <>
                  <span className="text-nowrap">
                    Cache timestamp: <b>{props.cacheTimestamp.toUTCString()}</b>
                    .
                  </span>
                  <br />
                </>
              )}
              <span>
                API available <a href="/graphql">here</a>, get the source on{' '}
                <a href="https://github.com/dhedegaard/pollen-js">Github</a>
              </span>
            </small>
          </div>
        </div>
      </div>
    </body>
  </html>
)

export default Index
