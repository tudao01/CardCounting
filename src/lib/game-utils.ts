import type { CardType } from "./types"

const suits: CardType["suit"][] = ["S", "H", "D", "C"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export function createDeck(): CardType[] {
  const deck: CardType[] = []
  for (const suit of suits) {
    for (const value of values) {
      let numericValue = Number.parseInt(value)
      if (value === "A") numericValue = 11
      else if (["J", "Q", "K"].includes(value)) numericValue = 10

      deck.push({ suit, value, numericValue })
    }
  }
  return deck
}

export function shuffleDeck(deck: CardType[]): CardType[] {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function calculateScore(hand: CardType[]): number {
  let score = 0
  let aces = 0

  for (const card of hand) {
    if (card.value === "A") {
      aces++
      score += 11
    } else {
      score += card.numericValue
    }
  }

  // Adjust for aces
  while (score > 21 && aces > 0) {
    score -= 10
    aces--
  }

  return score
}
