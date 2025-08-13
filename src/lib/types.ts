export type CardType = {
  suit: "S" | "H" | "D" | "C"
  value: string
  numericValue: number
}

export type GameState =
  | "menu"
  | "AISetup"
  | "AIBetting"
  | "AIPlaying"
  | "newGameSetup"
  | "betting"
  | "waiting"
  | "playing"
  | "playerWon"
  | "dealerWon"
  | "tie"
  | "playerBust"
  | "dealerBust"
