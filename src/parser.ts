import { inspect } from 'util'
import { parseStringPromise } from 'xml2js'
import { z } from 'zod'

const APIURL =
  'https://dmi.dk/dmidk_byvejrWS/rest/texts/forecast/pollen/Danmark'

const ApiResponse = z
  .array(
    z.object({
      products: z.object({
        text: z.string().min(1),
      }),
    })
  )
  .min(1)
const xmlSchema = z.object({
  pollen_info: z.object({
    region: z.array(
      z.object({
        name: z.tuple([z.string()]),
        forecast: z.tuple([z.string()]),
        readings: z.tuple([
          z.object({
            reading: z.array(
              z.object({
                name: z.tuple([z.string()]),
                value: z.tuple([
                  z.union([
                    z.literal('-'),
                    z.string().regex(/^\d+(?:\s\D+)?$/),
                  ]),
                ]),
              })
            ),
          }),
        ]),
      })
    ),
    info: z.tuple([z.string()]),
  }),
})

type ApiResponse = z.infer<typeof ApiResponse>

const fetchData = async (): Promise<ApiResponse> => {
  return await fetch(APIURL)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`Unclean RC: ${resp.status} ${resp.statusText}`)
      }
      return resp.json()
    })
    .then((data: unknown) => ApiResponse.parseAsync(data))
}

const parseData = async (apiResponse: ApiResponse) => {
  if (apiResponse == null) {
    throw new Error('No data')
  }
  const xml = apiResponse[0]?.products.text
  if (xml == null) {
    throw new Error('No XML')
  }
  return await parseXml(xml)
}

const parseXml = async (xml: string): Promise<z.TypeOf<typeof xmlSchema>> => {
  const data = await parseStringPromise(xml)
  return xmlSchema.parseAsync(data).catch((error) => {
    throw error
  })
}

export interface ParsedXMLStructure {
  city: string
  values: { [key: string]: number | string | null }
  forecast: string
}

const preprocessForecase = (forecast: string): string =>
  forecast.replace(/&?gt;/g, '>').replace(/&?lt;/g, '<')

const parseXMLStructure = function* (
  xml: z.TypeOf<typeof xmlSchema>
): IterableIterator<ParsedXMLStructure> {
  for (const region of xml.pollen_info.region) {
    yield {
      city: region.name[0],
      values: region.readings[0].reading.reduce<{
        [key: string]: number | string | null
      }>((obj, elem) => {
        const [name] = elem.name
        const [value] = elem.value
        obj[name] =
          value === '-'
            ? null
            : !/^\d+/.test(value)
            ? value
            : parseInt(value, 10)
        return obj
      }, {}),
      forecast: preprocessForecase(region.forecast[0]),
    }
  }
}

export const fetchAndParse = async function () {
  const data = await fetchData()
  const parsedXml = await parseData(data)
  const result = []
  for (const elem of Array.from(parseXMLStructure(parsedXml))) {
    result.push(elem)
  }
  return result
}
