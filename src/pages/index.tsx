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
  Grid,
  Box,
  Card,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Link,
} from '@mui/material'
import { createTheme } from '@mui/material/styles'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/react'
import { Logo } from '../components/Logo'
import { CSSProperties, FC } from 'react'

const GlobalStyle = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Roboto';
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/roboto-latin-400.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Roboto';
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/roboto-latin-500.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Roboto';
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/roboto-latin-700.woff2') format('woff2');
      }
    `}
  />
)

const SizedTypography = styled(Typography)<{
  fontSize: CSSProperties['fontSize']
}>`
  font-size: ${(p) => p.fontSize};
  word-break: break-word;
`

const HeaderTypography = styled(Typography)`
  display: flex;
  align-items: center;
`

type Props = {
  data: ParsedXMLStructure[] | undefined
  cacheTimestamp: Date | undefined
}
const Index: FC<Props> = (props) => {
  const description =
    props.data?.map((e) => `${e.city}: ${e.forecast}`).join(' - ') ?? ''
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: colors.lightGreen,
          secondary: colors.blue,
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
          <meta name="theme-color" content="#8bc34a" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="description" content={description} />
          <meta property="og:site_name" content="Pollen" />
          <meta property="og:url" content="https://pollen.dhedegaard.dk/" />
          <meta property="og:title" content="Pollen" />
          <meta property="og:description" content={description} />
          <meta property="og:image" content="/favicon-256.png" />
          <title>Pollen</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/favicon-256.png" />
        </head>
        <body>
          <Box mb={2}>
            <AppBar position="static" color="primary">
              <Toolbar variant="dense">
                <Container>
                  <HeaderTypography variant="h6">
                    <Logo />
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
              <SizedTypography fontSize="0.9em" paragraph align="right">
                {props.cacheTimestamp != null && (
                  <>
                    Cache timestamp: <b>{props.cacheTimestamp.toUTCString()}</b>
                    .
                    <br />
                  </>
                )}
                Get the source on{' '}
                <Link
                  color="#000000de"
                  variant="body2"
                  href="https://github.com/dhedegaard/pollen-js"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Github
                </Link>
              </SizedTypography>
            </Box>
          </Container>
        </body>
      </html>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html:
            '"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js")});',
        }}
      />
    </ThemeProvider>
  )
}

export default Index
