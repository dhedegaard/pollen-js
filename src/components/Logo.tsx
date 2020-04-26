import React from 'react'
import fs from 'fs'
import path from 'path'

export const Logo: React.FC = () => {
  const staticPath = React.useMemo(
    () => path.resolve(__dirname, '..', '..', 'static'),
    []
  )
  const logo = React.useMemo(
    () => fs.readFileSync(path.resolve(staticPath, 'logo.png')),
    [staticPath]
  )
  const logo2x = React.useMemo(
    () => fs.readFileSync(path.resolve(staticPath, 'logo@2x.png')),
    [staticPath]
  )
  const logoDataURL = React.useMemo(
    () => `data:image/png;base64,${logo.toString('base64')}`,
    [logo]
  )
  const logo2xDataURL = React.useMemo(
    () => `data:image/png;base64,${logo2x.toString('base64')}`,
    [logo2x]
  )
  const srcSet = React.useMemo(() => `${logoDataURL} 1x, ${logo2xDataURL} 2x`, [
    logoDataURL,
    logo2xDataURL,
  ])

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
