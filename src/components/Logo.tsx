import { FC, useMemo } from 'react'
import fs from 'fs'
import path from 'path'

export const Logo: FC = () => {
  const staticPath = useMemo(
    () => path.resolve(__dirname, '..', '..', 'static'),
    []
  )
  const logo = useMemo(
    () => fs.readFileSync(path.resolve(staticPath, 'logo.png')),
    [staticPath]
  )
  const logo2x = useMemo(
    () => fs.readFileSync(path.resolve(staticPath, 'logo@2x.png')),
    [staticPath]
  )
  const logoDataURL = useMemo(
    () => `data:image/png;base64,${logo.toString('base64')}`,
    [logo]
  )
  const logo2xDataURL = useMemo(
    () => `data:image/png;base64,${logo2x.toString('base64')}`,
    [logo2x]
  )
  const srcSet = useMemo(
    () => `${logoDataURL} 1x, ${logo2xDataURL} 2x`,
    [logoDataURL, logo2xDataURL]
  )

  return (
    <img
      src={logoDataURL}
      srcSet={srcSet}
      width="30"
      height="30"
      alt="Pollen icon"
    />
  )
}
