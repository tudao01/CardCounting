"use client"

interface MoneySetupProps {
  startingMoneyInput: string
  onStartingMoneyChange: (value: string) => void
  onStartGame: () => void
  onBack: () => void
}

export function MoneySetup({ startingMoneyInput, onStartingMoneyChange, onStartGame, onBack }: MoneySetupProps) {
  return (
    <div className="min-h-screen bg-green-800 p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-green-700 border border-green-600 rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Set Starting Money</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-white text-lg font-medium mb-2">Starting Amount ($)</label>
              <input
                type="number"
                value={startingMoneyInput}
                onChange={(e) => onStartingMoneyChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-white text-center text-lg font-medium"
                min="1"
                max="100000"
              />
            </div>
            <button
              onClick={onStartGame}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors"
            >
              Start Game
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded font-medium transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
