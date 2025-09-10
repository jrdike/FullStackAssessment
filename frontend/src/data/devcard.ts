import type { Devcard } from '../types/devcard'
export const dummyCards: Devcard[] = []
  for (let i = 1; i <= 8; i++) {
      dummyCards.push({
        id: i.toString(),
        clicks: 0,
        firstclick: 9223372036854775000
    })
  }