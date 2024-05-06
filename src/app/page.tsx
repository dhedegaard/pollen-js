import { use } from 'react'
import { getData } from '../actions/data-action'
import { Logo } from '../components/Logo'
import '../styles/global.css'
import { CacheTimestamp } from './CacheTimestamp'
import { CityElements } from './CityElements'
import Link from 'next/link'

export const revalidate = 600

export default function RootPage() {
  const data = use(getData())

  return (
    <>
      <header className="bg-lime-500 py-3 flex items-center justify-center shadow mb-6">
        <h1 className="max-w-6xl px-4 w-full flex-none flex items-center text-xl gap-1 tracking-wide">
          <Logo />
          <span>Pollen</span>
        </h1>
      </header>
      <main className="max-w-6xl px-4 mx-auto ">
        <div className="grid grid-cols-2 gap-4 items-start mb-4">
          <CityElements initialData={data} />
        </div>

        <footer className="my-2 text-right ml-auto text-sm flex flex-col gap-0.5">
          <CacheTimestamp initialData={data} />
          <div>
            Get the data{' '}
            <Link className="link link-primary" href="/api/data">
              here
            </Link>
            .
          </div>
          <div>
            Get the source on{' '}
            <a
              href="https://github.com/dhedegaard/pollen-js"
              className="link link-primary"
              target="_blank"
              rel="noreferrer noopener"
            >
              Github
            </a>
            .
          </div>
        </footer>
      </main>
    </>
  )
}
