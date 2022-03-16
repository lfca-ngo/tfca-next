import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Confetti from 'react-confetti'

import { useTrackEvent } from '../services/analytics'

export const ChallengeContext = createContext(null)

// Provider to share all challenge specific data
// passed via URL params or share token, and made available to
// all components in the app

export const ChallengeProvider = ({ children, customization = null }) => {
  const [showConfetti, setShowConfetti] = useState(false)
  const [progress, setProgress] = useState(0)

  useTrackEvent({ name: 'page_visit' })
  return (
    <ChallengeContext.Provider
      value={{ customization, progress, setProgress, setShowConfetti }}
    >
      {showConfetti && <Confetti />}
      {children}
    </ChallengeContext.Provider>
  )
}

export const useChallenge = () => {
  const context = useContext(ChallengeContext)
  return context
}

export const useConfetti = () => {
  const { setShowConfetti } = useContext(ChallengeContext)

  const fireConfetti = useCallback(() => {
    setShowConfetti(true)
    let timer = setTimeout(() => setShowConfetti(false), 3500)
    return () => clearTimeout(timer)
  }, [setShowConfetti])

  useEffect(() => {
    fireConfetti()
  }, [fireConfetti])

  return true
}
