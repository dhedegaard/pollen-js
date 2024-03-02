'use client'

import styled from '@emotion/styled'
import {
  AppBar,
  Box,
  Card,
  Container,
  CssBaseline,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Toolbar,
  Typography,
  colors,
} from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { CSSProperties, FC } from 'react'
import { Logo } from '../components/Logo'
import { ValueItem } from '../components/ValueItem'
import { ParsedXMLStructure } from '../parser'

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
const ClientRootPage: FC<Props> = (props) => {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: colors.lightGreen,
          secondary: colors.blue,
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
      })}
    >
      <CssBaseline />
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
                      {Object.entries(elem.values).map(([pollenName, val]) => (
                        <TableRow key={pollenName}>
                          <TableCell>
                            <div>
                              <SizedTypography fontSize="0.9em">
                                {pollenName}: <ValueItem value={val} />
                              </SizedTypography>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
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
    </ThemeProvider>
  )
}

export default ClientRootPage
