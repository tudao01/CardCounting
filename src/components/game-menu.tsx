"use client"

interface GameMenuProps {
  playerMoney: number
  onNewGame: () => void
  onAIPlay: () => void
  onContinue: () => void
}

export function GameMenu({ playerMoney, onNewGame, onAIPlay, onContinue }: GameMenuProps) {
  return (
    <div className="min-h-screen bg-green-800 p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-green-700 border border-green-600 rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Card Counting Practice</h1>
          <div className="space-y-4">
            <button
              onClick={onNewGame}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors"
            >
              New Game
            </button>
            <button
              onClick={onAIPlay}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded font-medium transition-colors"
            >
              AI Blackjack
            </button>
            {playerMoney > 0 && (
              <button
                onClick={onContinue}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-medium transition-colors"
              >
                Continue (${playerMoney})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
