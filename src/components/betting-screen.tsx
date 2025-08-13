"use client"

interface BettingScreenProps {
  playerMoney: number
  betInput: string
  onBetInputChange: (value: string) => void
  onPlaceBet: () => void
  onBackToMenu: () => void
}

export function BettingScreen({
  playerMoney,
  betInput,
  onBetInputChange,
  onPlaceBet,
  onBackToMenu,
}: BettingScreenProps) {
  return (
    <div className="min-h-screen bg-green-800 p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-green-700 border border-green-600 rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Place Your Bet</h1>
          <div className="text-white text-lg mb-6">
            Available: <span className="text-yellow-300">${playerMoney}</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Bet Amount ($)</label>
              <input
                type="number"
                value={betInput}
                onChange={(e) => onBetInputChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-center text-lg font-medium"
                min="1"
                max={playerMoney}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onBetInputChange("10")}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                $10
              </button>
              <button
                onClick={() => onBetInputChange("25")}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                $25
              </button>
              <button
                onClick={() => onBetInputChange("50")}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                $50
              </button>
              <button
                onClick={() => onBetInputChange(playerMoney.toString())}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                All In
              </button>
            </div>
            <button
              onClick={onPlaceBet}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors"
            >
              Place Bet
            </button>
            <button
              onClick={onBackToMenu}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded font-medium transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
