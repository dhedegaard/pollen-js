import { use } from 'react'
import { CityElement } from '../components/CityElement'
import { Logo } from '../components/Logo'
import { fetchAndParse } from '../parser'
import '../styles/global.css'

export const revalidate = 600

export default function RootPage() {
  const data = use(fetchAndParse())
  const now = new Date()

  return (
    <>
      <header className="bg-lime-500 py-3 flex items-center justify-center shadow mb-6">
        <h1 className="max-w-6xl px-4 w-full flex-none flex items-center text-xl gap-1 tracking-wide">
          <Logo />
          <span>Pollen</span>
        </h1>
      </header>
      <div className="max-w-6xl px-4 mx-auto">
        <div className="grid grid-cols-2 gap-4 items-start">
          {data.map((element) => (
            <CityElement element={element} key={element.city} />
          ))}
        </div>

        <div className="my-2 text-right ml-auto text-sm">
          Cache timestamp: <b>{now.toUTCString()}</b>
          .
          <br />
          Get the source on{' '}
          <a
            href="https://github.com/dhedegaard/pollen-js"
            className="link link-primary"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </a>
        </div>
      </div>
    </>
  )
}
