import React from 'react'
import { ParsedXMLStructure } from '../parser'
import ValueItem from '../components/ValueItem'
import {
  AppBar,
  CssBaseline,
  Container,
  Typography,
  Toolbar,
  colors,
  ThemeProvider,
  createMuiTheme,
  Grid,
  Box,
  Card,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from '@material-ui/core'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-display: swap;
    src: url('/static/fonts/roboto-latin-400.woff2') format('woff2');
  }
  @font-face {
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: bold;
    font-display: swap;
    src: url('/static/fonts/roboto-latin-700.woff2') format('woff2');
  }
`

const SizedTypography = styled(Typography)<{
  fontSize: React.CSSProperties['fontSize']
}>`
  font-size: ${(p) => p.fontSize};
`

const HeaderTypography = styled(Typography)`
  display: flex;
  align-items: center;
`

type Props = {
  data: ParsedXMLStructure[] | undefined
  cacheTimestamp: Date | undefined
}
const Index: React.FC<Props> = (props) => (
  <ThemeProvider
    theme={createMuiTheme({
      palette: {
        primary: colors.lightGreen,
        secondary: colors.grey,
      },
    })}
  >
    <html lang="en" prefix="og: http://ogp.me/ns#">
      <CssBaseline />
      <GlobalStyle />
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
      </head>
      <body>
        <Box mb={2}>
          <AppBar position="static" color="primary">
            <Toolbar variant="dense">
              <Container>
                <HeaderTypography variant="h6">
                  <img
                    src="/static/logo.png"
                    width="30"
                    height="30"
                    alt="Pollen icon"
                  />
                  <span>Pollen</span>
                </HeaderTypography>
              </Container>
            </Toolbar>
          </AppBar>
        </Box>
        <Container>
          <Grid container spacing={3}>
            {props.data?.map((elem) => (
              <Grid item xs={6} key={elem.city}>
                <Card>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <SizedTypography fontSize="1.2em">
                              {elem.city}
                            </SizedTypography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(elem.values).map(
                          ([pollenName, val]) => (
                            <TableRow key={pollenName}>
                              <TableCell>
                                <div>
                                  <SizedTypography fontSize="0.9em">
                                    {pollenName}: <ValueItem value={val} />
                                  </SizedTypography>
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        {elem.forecast !== '' && (
                          <TableRow>
                            <TableCell>
                              <SizedTypography fontSize="0.9em">
                                {elem.forecast}
                              </SizedTypography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box mt={2}>
            <SizedTypography
              fontSize="0.9em"
              paragraph
              color="secondary"
              align="right"
            >
              {props.cacheTimestamp != null && (
                <>
                  Cache timestamp: <b>{props.cacheTimestamp.toUTCString()}</b>.
                  <br />
                </>
              )}
              API available <a href="/graphql">here</a>, get the source on{' '}
              <a href="https://github.com/dhedegaard/pollen-js">Github</a>
            </SizedTypography>
          </Box>
        </Container>
      </body>
    </html>
  </ThemeProvider>
)

export default Index
