"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Language } from "@/app/page"
import { useLanguage } from "@/contexts/language-context"

interface NotificationPopupProps {
  language: Language
}

const defaultTranslations = {
  en: {
    notifications: [
      "🎉 Marcus from TechVenture just closed a $1,500 deal!",
      "💰 Sarah from Luxury Brands secured a $2,200 contract!",
      "🚀 Roberto from Global Solutions signed for $1,800!",
      "✨ New client from Miami just booked a $1,200 package!",
      "🔥 Premium consultation booked for $2,000!",
    ],
  },
  pt: {
    notifications: [
      "🎉 Marcus da TechVenture fechou um negócio de $1,500!",
      "💰 Sarah da Luxury Brands garantiu um contrato de $2,200!",
      "🚀 Roberto da Global Solutions assinou por $1,800!",
      "✨ Novo cliente de Miami reservou um pacote de $1,200!",
      "🔥 Consultoria premium reservada por $2,000!",
    ],
  },
  es: {
    notifications: [
      "🎉 Marcus de TechVenture cerró un trato de $1,500!",
      "💰 Sarah de Luxury Brands aseguró un contrato de $2,200!",
      "🚀 Roberto de Global Solutions firmó por $1,800!",
      "✨ Nuevo cliente de Miami reservó un paquete de $1,200!",
      "🔥 Consultoría premium reservada por $2,000!",
    ],
  },
}

export default function NotificationPopup({ language }: NotificationPopupProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [notification, setNotification] = React.useState("")
  const { translations: contextTranslations } = useLanguage()

  // Use translations from context if available, otherwise use default
  const t = contextTranslations.notifications || defaultTranslations[language] || defaultTranslations.en

  const showNotification = (message: string) => {
    setNotification(message)
    setIsVisible(true)

    // Play notification sound
    const audio = new Audio("/notification-sound.mp3")
    audio.volume = 0.3
    audio.play().catch(() => {}) // Ignore errors if audio can't play

    setTimeout(() => {
      setIsVisible(false)
    }, 4000)
  }

  React.useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      const randomNotification = t.notifications[Math.floor(Math.random() * t.notifications.length)]
      showNotification(randomNotification)
    }, 5000)

    // Then show notifications every 20-40 seconds
    const interval = setInterval(
      () => {
        const randomNotification = t.notifications[Math.floor(Math.random() * t.notifications.length)]
        showNotification(randomNotification)
      },
      Math.random() * 20000 + 20000,
    ) // Random between 20-40 seconds

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [language, t.notifications])

  return (
    <div className="fixed top-4 left-4 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-2xl max-w-sm"
          >
            <p className="text-white text-sm font-medium">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
