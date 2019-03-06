import 'xml2js'
import Axios from 'axios'
import { parseString } from 'xml2js'

const APIURL =
  'https://dmi.dk/dmidk_byvejrWS/rest/texts/forecast/pollen/Danmark'

type ApiResponse = Array<{
  name: string
  language: string
  products: {
    timestamp: number
    text_type: string
    text_format: string
    // XML data
    text: string
    varnishURL: string
  }
}>

const fetchData = async (): Promise<ApiResponse> => {
  const resp = await Axios.get<ApiResponse>(APIURL)
  if (resp.status < 200 || resp.status >= 400) {
    throw new Error('Unclean RC: ' + resp.status)
  }
  return resp.data
}

const parseData = async (apiResponse: ApiResponse) => {
  if (apiResponse.length === 0) {
    throw new Error('No elements in the api response.')
  }
  const xml = apiResponse[0].products.text
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

type ParsedXMLStructure = {
  city: string
  values: { [key: string]: number }
  forecast: string
}

const parseXMLStructure = function*(
  xml: any
): IterableIterator<ParsedXMLStructure> {
  for (const region of xml.pollen_info.region) {
    console.log('***REGION:', JSON.stringify(region, null, 2))
    yield {
      city: region.name[0],
      values: region.readings[0].reading.reduce(
        (
          obj: { [key: string]: number },
          elem: { name: string; value: string }
        ) => {
          const value = elem.value[0]
          obj[elem.name] = value === '-' ? -1 : parseInt(value, 10)
          return obj
        },
        {}
      ),
      forecast: region.forecast[0]
    }
  }
}

export const fetchAndParse = async function() {
  const data = await fetchData()
  const parsedXml = await parseData(data)
  const result = []
  for (const elem of parseXMLStructure(parsedXml)) {
    result.push(elem)
  }
  return result
}
