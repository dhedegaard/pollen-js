'use server'

import {
  AstmaAllergiFeedData,
  createAstmaAllergiClient,
} from '../clients/astma-allergi-client'

export async function getData(): Promise<AstmaAllergiFeedData> {
  try {
    const astmaAllergiClient = createAstmaAllergiClient()
    return await astmaAllergiClient.getPollenFeed()
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
