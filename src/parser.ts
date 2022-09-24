import * as yup from 'yup'
import { parseString } from 'xml2js'

const APIURL =
  'https://dmi.dk/dmidk_byvejrWS/rest/texts/forecast/pollen/Danmark'

const apiResponseSchema = yup
  .array()
  .of(
    yup.object({
      products: yup
        .object({
          text: yup.string().required(),
        })
        .required()
        .defined(),
    })
  )
  .min(1)

type ApiResponse = yup.TypeOf<typeof apiResponseSchema>

const fetchData = async (): Promise<ApiResponse> => {
  return await fetch(APIURL)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`Unclean RC: ${resp.status} ${resp.statusText}`)
      }
      return resp.json()
    })
    .then((data: unknown) => apiResponseSchema.validate(data))
}

const parseData = async (apiResponse: ApiResponse) => {
  if (apiResponse == null) {
    throw new Error('No data')
  }
  const xml = apiResponse[0].products.text
  if (xml == null) {
    throw new Error('No XML')
  }
  return await parseXml(xml)
}

const parseXml = (xml: string) =>
  new Promise((resolve, reject) => {
    parseString(xml, (error, data) => {
      if (error != null) {
        return reject(error)
      }
      return resolve(data)
    })
  })

export interface ParsedXMLStructure {
  city: string
  values: { [key: string]: number | string | undefined }
  forecast: string
}

const preprocessForecase = (forecast: string): string =>
  forecast.replace(/&?gt;/g, '>').replace(/&?lt;/g, '<')

const parseXMLStructure = function* (
  xml: any
): IterableIterator<ParsedXMLStructure> {
  for (const region of xml.pollen_info.region) {
    yield {
      city: region.name[0],
      values: region.readings[0].reading.reduce(
        (
          obj: { [key: string]: number | string | undefined },
          elem: { name: string; value: string }
        ) => {
          const value = elem.value[0]
          obj[elem.name] =
            value === '-'
              ? undefined
              : !/\d+/.test(value)
              ? value
              : parseInt(value, 10)
          return obj
        },
        {}
      ),
      forecast: preprocessForecase(region.forecast[0]),
    }
  }
}

export const fetchAndParse = async function () {
  const data = await fetchData()
  const parsedXml = await parseData(data)
  const result = []
  for (const elem of parseXMLStructure(parsedXml)) {
    result.push(elem)
  }
  return result
}
