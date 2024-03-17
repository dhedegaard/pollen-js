import { FC } from 'react'
import logoPng from '../../public/logo.png'
import logo2xPng from '../../public/logo@2x.png'

export const Logo: FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoPng.src}
      srcSet={`${logoPng.src} 1x, ${logo2xPng.src} 2x`}
      width="30"
      height="30"
      alt="Pollen icon"
    />
  )
}
