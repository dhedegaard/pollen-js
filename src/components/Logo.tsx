import { FC, useMemo } from 'react'
import logoPng from '../../public/logo.png'
import logo2xPng from '../../public/logo@2x.png'

export const Logo: FC = () => {
  const srcSet = useMemo(() => `${logoPng.src} 1x, ${logo2xPng.src} 2x`, [])

  return (
    <img
      src={logoPng.src}
      srcSet={srcSet}
      width="30"
      height="30"
      alt="Pollen icon"
    />
  )
}
