import type { CardType } from "@/lib/types"

function getCardFilename(card: CardType): string {
  const suitMap: Record<string, string> = {
    "♠": "s",
    "♥": "h",
    "♦": "d",
    "♣": "c",
  }

  const value = card.value.toLowerCase()
  const suit = suitMap[card.suit]
  return `${value}${suit}.png`
}

export function CardComponent({ card, hidden = false }: { card: CardType; hidden?: boolean }) {
  if (hidden) {
    return (
      <div className="w-20 h-28 bg-blue-600 border-2 border-blue-700 rounded-lg flex items-center justify-center shadow-lg">
        <div className="text-white text-xs">🂠</div>
      </div>
    )
  }

  return (
    <div className="w-20 h-28 shadow-lg">
      <img
        src={`/${getCardFilename(card)}`}
        alt={`${card.value} of ${card.suit}`}
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  )
}
