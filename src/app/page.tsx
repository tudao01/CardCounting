"use client"

import { useState, useCallback } from "react"
import type { CardType, GameState } from "@/lib/types"
import { createDeck, shuffleDeck, calculateScore } from "@/lib/game-utils"
import { CardComponent } from "@/components/card"
import { GameMenu } from "@/components/game-menu"
import { MoneySetup } from "@/components/money-setup"
import { BettingScreen } from "@/components/betting-screen"

export default function BlackjackGame() {
  const [deck, setDeck] = useState<CardType[]>([])
  const [playerHand, setPlayerHand] = useState<CardType[]>([])
  const [dealerHand, setDealerHand] = useState<CardType[]>([])
  const [gameState, setGameState] = useState<GameState>("menu")
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerScore, setDealerScore] = useState(0)
  const [showDealerCard, setShowDealerCard] = useState(false)
  const [playerMoney, setPlayerMoney] = useState(1000)
  const [startingMoneyInput, setStartingMoneyInput] = useState("1000")
  const [currentBet, setCurrentBet] = useState(0)
  const [betInput, setBetInput] = useState("10")

  const showNewGameSetup = useCallback(() => {
    setGameState("newGameSetup")
  }, [])

  const showAIPlay = useCallback(() => {
    setGameState("AISetup")
  }, [])

  const continueGame = useCallback(() => {
    setGameState("betting")
  }, [])

  const startWithCustomMoney = useCallback(() => {
    const money = Number.parseInt(startingMoneyInput) || 1000
    setPlayerMoney(money)
    setGameState("betting")
  }, [startingMoneyInput])

  const placeBet = useCallback(() => {
    const bet = Number.parseInt(betInput) || 10
    if (bet > playerMoney) {
      alert("You don't have enough money for that bet!")
      return
    }
    if (bet <= 0) {
      alert("Bet must be greater than 0!")
      return
    }
    setCurrentBet(bet)
    setGameState("waiting")
  }, [betInput, playerMoney])

  const AIplaceBet = useCallback(() => {
    const bet = Number.parseInt(betInput) || 10
    if (bet > playerMoney) {
      alert("You don't have enough money for that bet!")
      return
    }
    if (bet <= 0) {
      alert("Bet must be greater than 0!")
      return
    }
    setCurrentBet(bet)
    setGameState("waiting")
  }, [betInput, playerMoney])

const startAIGame = useCallback(() => {
  const newDeck = shuffleDeck(createDeck())
  const playerCards = [newDeck[0], newDeck[2]]
  const dealerCards = [newDeck[1], newDeck[3]]

  setDeck(newDeck.slice(4))
  setPlayerHand(playerCards)
  setDealerHand(dealerCards)
  setPlayerScore(calculateScore(playerCards))
  setDealerScore(calculateScore([dealerCards[0]]))
  setGameState("AIPlaying")
  setShowDealerCard(false)

  // Check for immediate blackjack (same as before)
  if (calculateScore(playerCards) === 21) {
    setShowDealerCard(true)
    const fullDealerScore = calculateScore(dealerCards)
    setDealerScore(fullDealerScore)
    if (fullDealerScore === 21) {
      setGameState("tie")
    } else {
      setGameState("playerWon")
    }
  }
}, [])


  const startNewGame = useCallback(() => {
    const newDeck = shuffleDeck(createDeck())
    const playerCards = [newDeck[0], newDeck[2]]
    const dealerCards = [newDeck[1], newDeck[3]]

    setDeck(newDeck.slice(4))
    setPlayerHand(playerCards)
    setDealerHand(dealerCards)
    setPlayerScore(calculateScore(playerCards))
    setDealerScore(calculateScore([dealerCards[0]]))
    setGameState("playing")
    setShowDealerCard(false)

    // Check for immediate blackjack
    if (calculateScore(playerCards) === 21) {
      setShowDealerCard(true)
      const fullDealerScore = calculateScore(dealerCards)
      setDealerScore(fullDealerScore)
      if (fullDealerScore === 21) {
        setGameState("tie")
      } else {
        setGameState("playerWon")
      }
    }
  }, [])

  const hit = useCallback(() => {
    if (gameState !== "playing" || deck.length === 0) return

    const newCard = deck[0]
    const newPlayerHand = [...playerHand, newCard]
    const newScore = calculateScore(newPlayerHand)

    setDeck(deck.slice(1))
    setPlayerHand(newPlayerHand)
    setPlayerScore(newScore)

    if (newScore > 21) {
      setGameState("playerBust")
      setShowDealerCard(true)
      setDealerScore(calculateScore(dealerHand))
      setPlayerMoney((prev) => prev - currentBet)
    }
  }, [deck, playerHand, gameState, dealerHand, currentBet])

  const stand = useCallback(() => {
    if (gameState !== "playing") return

    setShowDealerCard(true)
    const currentDealerHand = [...dealerHand]
    let currentDeck = [...deck]

    // Dealer hits on 16 and below
    while (calculateScore(currentDealerHand) < 17 && currentDeck.length > 0) {
      currentDealerHand.push(currentDeck[0])
      currentDeck = currentDeck.slice(1)
    }

    const finalDealerScore = calculateScore(currentDealerHand)
    const finalPlayerScore = calculateScore(playerHand)

    setDealerHand(currentDealerHand)
    setDealerScore(finalDealerScore)
    setDeck(currentDeck)

    if (finalDealerScore > 21) {
      setGameState("dealerBust")
      setPlayerMoney((prev) => prev + currentBet)
    } else if (finalPlayerScore > finalDealerScore) {
      setGameState("playerWon")
      setPlayerMoney((prev) => prev + currentBet)
    } else if (finalDealerScore > finalPlayerScore) {
      setGameState("dealerWon")
      setPlayerMoney((prev) => prev - currentBet)
    } else {
      setGameState("tie")
    }
  }, [gameState, dealerHand, deck, playerHand, currentBet])

  const getGameMessage = () => {
    switch (gameState) {
      case "waiting":
        return 'Click "Deal Cards" to start!'
      case "AIPlaying":
        return "AI is playing..."
      case "playing":
        return "Hit or Stand?"
      case "playerWon":
        return `🎉 You win! +$${currentBet}`
      case "dealerWon":
        return `😔 Dealer wins! -$${currentBet}`
      case "tie":
        return "🤝 It's a tie!"
      case "playerBust":
        return `💥 Bust! You lose! -$${currentBet}`
      case "dealerBust":
        return `🎉 Dealer busts! You win! +$${currentBet}`
      default:
        return ""
    }
  }

  const backToMenu = useCallback(() => {
    if (playerMoney <= 0) {
      setGameState("menu")
      setPlayerMoney(1000)
    } else {
      setGameState("betting")
    }
  }, [playerMoney])

  if (gameState === "menu") {
    return <GameMenu playerMoney={playerMoney} onNewGame={showNewGameSetup} onAIPlay={showAIPlay} onContinue={continueGame} />
  }

  if (gameState === "newGameSetup") {
    return (
      <MoneySetup
        startingMoneyInput={startingMoneyInput}
        onStartingMoneyChange={setStartingMoneyInput}
        onStartGame={startWithCustomMoney}
        onBack={() => setGameState("menu")}
      />
    )
  }

  if (gameState === "AISetup") {
    return (
      <MoneySetup
        startingMoneyInput={startingMoneyInput}
        onStartingMoneyChange={setStartingMoneyInput}
        onStartGame={startWithCustomMoney}
        onBack={() => setGameState("menu")}
      />
    )
  }

  if (gameState === "AIBetting") {
    return (
      <BettingScreen
        playerMoney={playerMoney}
        betInput={betInput}
        onBetInputChange={setBetInput}
        onPlaceBet={placeBet}
        onBackToMenu={() => setGameState("menu")}
      />
    )
  }

  if (gameState === "betting") {
    return (
      <BettingScreen
        playerMoney={playerMoney}
        betInput={betInput}
        onBetInputChange={setBetInput}
        onPlaceBet={placeBet}
        onBackToMenu={() => setGameState("menu")}
      />
    )
  }

  return (
    <div className="min-h-screen bg-green-800 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="bg-green-700 border border-green-600 rounded-lg shadow-lg">
          <div className="p-6 text-center border-b border-green-600">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold text-white">Blackjack</h1>
              <div className="text-white text-lg font-medium">
                Money: <span className="text-yellow-300">${playerMoney}</span>
                {currentBet > 0 && (
                  <span className="ml-4">
                    Bet: <span className="text-red-300">${currentBet}</span>
                  </span>
                )}
              </div>
            </div>
            <div className="text-xl text-green-100">{getGameMessage()}</div>
          </div>

          <div className="p-6 space-y-8">
            {/* Dealer Section */}
            {gameState !== "waiting" && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-white">Dealer</h3>
                  <span className="bg-white text-black px-2 py-1 rounded text-sm font-medium">
                    {showDealerCard ? dealerScore : "?"}
                  </span>
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                  {dealerHand.map((card, index) => (
                    <CardComponent key={index} card={card} hidden={index === 1 && !showDealerCard} />
                  ))}
                </div>
              </div>
            )}

            {/* Player Section */}
            {gameState !== "waiting" && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-white">You</h3>
                  <span className="bg-white text-black px-2 py-1 rounded text-sm font-medium">{playerScore}</span>
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                  {playerHand.map((card, index) => (
                    <CardComponent key={index} card={card} />
                  ))}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-center gap-4 flex-wrap">
              {gameState === "waiting" && (
                <button
                  onClick={startNewGame}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors"
                >
                  Deal Cards
                </button>
              )}

              {gameState === "playing" && (
                <>
                  <button
                    onClick={hit}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition-colors"
                  >
                    Hit
                  </button>
                  <button
                    onClick={stand}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded font-medium transition-colors"
                  >
                    Stand
                  </button>
                </>
              )}

              {["playerWon", "dealerWon", "tie", "playerBust", "dealerBust"].includes(gameState) && (
                <button
                  onClick={backToMenu}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded font-medium transition-colors"
                >
                  {playerMoney <= 0 ? "Game Over - Back to Menu" : "Next Hand"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
