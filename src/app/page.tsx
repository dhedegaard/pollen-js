import Link from 'next/link'
import { use } from 'react'
import { getData } from '../actions/data-action'
import { Logo } from '../components/Logo'
import '../styles/global.css'
import { CityElements } from './CityElements'
import { LastUpdateTimestamp } from './LastUpdateTimestamp'
import { LoadingIndicator } from './LoadingIndicator'

export const revalidate = 3600

export default function RootPage() {
  const data = use(getData())

  return (
    <>
      <header className="mb-8 bg-lime-500 px-4 py-3 shadow">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4">
          <h1 className="flex flex-auto items-center gap-1 px-4 text-xl tracking-wide">
            <Logo />
            <span>Pollen</span>
          </h1>
          <LoadingIndicator />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <div className="mb-4 grid grid-cols-2 items-start gap-4">
          <CityElements initialData={data} />
        </div>

        <footer className="my-2 ml-auto flex flex-col gap-1 text-right text-sm">
          <LastUpdateTimestamp initialData={data} />
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
