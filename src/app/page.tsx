import { fetchAndParse } from '../parser'
import '../styles/global.css'
import ClientRootPage from './page.client'

export const revalidate = 600
export default async function RootPage() {
  const data = await fetchAndParse()
  const now = new Date()
  return <ClientRootPage data={data} cacheTimestamp={now} />
}
