import { z } from 'zod'

// See: <https://www.astma-allergi.dk/scripts/pollen.js>
const POLLEN_NAMES = {
  44: 'alternaria',
  7: 'birk',
  31: 'bynke',
  45: 'cladosporium',
  1: 'el',
  4: 'elm',
  28: 'græs',
  2: 'hassel',
} as const
const POLLEN_LEVEL_INTERVALS = {
  44: [0, 20, 100, 500],
  7: [0, 30, 100, 550],
  31: [0, 10, 50, 60],
  45: [0, 2000, 6000, 7000],
  1: [0, 10, 50, 200],
  4: [0, 10, 50, 80],
  28: [0, 10, 50, 150],
  2: [0, 5, 15, 40],
} as const

const nonEmptyStringSchema = z.string().min(1)

const fieldValueSchema = z
  .object({
    mapValue: z.object({
      fields: z.object({
        inSeason: z
          .object({ booleanValue: z.boolean() })
          .transform((value) => value.booleanValue),
        level: z
          .object({
            integerValue: z
              .string()
              .regex(/-?\d+$/)
              .transform((value) => parseInt(value)),
          })
          .transform((value) => value.integerValue)
          .transform((value) => (value === -1 ? null : value))
          .pipe(z.nullable(z.number().int().nonnegative())),
      }),
    }),
  })
  .transform((value) => value.mapValue.fields)

const innerDataSchema = z
  .object({
    mapValue: z
      .object({
        fields: z
          .object({
            '1': fieldValueSchema,
            '2': fieldValueSchema,
            '4': fieldValueSchema,
            '7': fieldValueSchema,
            '28': fieldValueSchema,
            '31': fieldValueSchema,
            '44': fieldValueSchema,
            '45': fieldValueSchema,
          })
          .transform((value) =>
            Object.entries(value).reduce<{
              [key in string]: z.infer<typeof fieldValueSchema>
            }>((acc, [key, value]) => {
              const intKey = parseInt(
                key
              ) as unknown as keyof typeof POLLEN_NAMES
              const pollenName = nonEmptyStringSchema.parse(
                POLLEN_NAMES[intKey]
              )
              acc[pollenName] = value
              return acc
            }, {})
          ),
      })
      .transform((value) => value.fields),
  })
  .transform((value) => value.mapValue)

const mapValueFieldsSchema = z
  .object({
    mapValue: z
      .object({
        fields: z.object({
          data: innerDataSchema,
        }),
      })
      .transform((value) => value.fields),
  })
  .transform((value) => value.mapValue)

const outerFieldsSchema = z
  .object({
    // København
    48: mapValueFieldsSchema,
    // Aarhus
    49: mapValueFieldsSchema,
  })
  .strict()
  .transform((value) => ({
    Aarhus: value[49],
    Copenhagen: value[48],
  }))

const responseJsonSchema = z.object({
  createTime: z.string().datetime({ offset: true }),
  updateTime: z.string().datetime({ offset: true }),
  fields: outerFieldsSchema,
})
interface ResponseJson extends z.infer<typeof responseJsonSchema> {}

export const createAstmaAllergiClient = () => ({
  getPollenFeed: z
    .function()
    .args()
    .implement(async function getPollenFeed(): Promise<ResponseJson> {
      const response = await fetch(
        'https://www.astma-allergi.dk/umbraco/Api/PollenApi/GetPollenFeed'
      ).then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Unclean RC: ${response.status} ${response.statusText}`
          )
        }
        return response
          .json()
          .then<ResponseJson>((json) =>
            responseJsonSchema.parseAsync(JSON.parse(json))
          )
      })
      return response
    }),
})
