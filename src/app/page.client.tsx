'use client'

import styled from '@emotion/styled'
import {
  AppBar,
  Box,
  Container,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  colors,
} from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { CSSProperties, FC } from 'react'
import { CityElement } from '../components/CityElement'
import { Logo } from '../components/Logo'
import { ParsedXMLStructure } from '../parser'

const SizedTypography = styled(Typography)<{
  fontSize: CSSProperties['fontSize']
}>`
  font-size: ${(p) => p.fontSize};
  word-break: break-word;
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
      <Box mb={2}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
            <Container>
              <h1 className="flex items-center text-xl gap-1 tracking-wide">
                <Logo />
                <span>Pollen</span>
              </h1>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <div className="grid grid-cols-2 gap-4 items-start">
          {props.data?.map((element) => (
            <CityElement element={element} key={element.city} />
          ))}
        </div>

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
