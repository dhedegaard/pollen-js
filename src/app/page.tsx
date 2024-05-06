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
      <header className="mb-6 flex items-center justify-center bg-lime-500 py-3 shadow">
        <h1 className="flex w-full max-w-6xl flex-none items-center gap-1 px-4 text-xl tracking-wide">
          <Logo />
          <span>Pollen</span>
        </h1>
      </header>
      <main className="mx-auto max-w-6xl px-4 ">
        <div className="mb-4 grid grid-cols-2 items-start gap-4">
          <CityElements initialData={data} />
        </div>

        <footer className="my-2 ml-auto flex flex-col gap-0.5 text-right text-sm">
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
