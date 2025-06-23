"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/app/page"
import { useUser } from "@/contexts/user-context"

interface FloatingMessageButtonProps {
  quizCompleted: boolean
  language: Language
}

const translations = {
  en: {
    messages: [
      "Ready to take your business to the next level?",
      "Discover the strategies that drive real growth!",
      "Your success story starts with the right guidance.",
      "Complete the journey to unlock premium insights!",
    ],
    completedMessage:
      "🎉 Congratulations! You've unlocked exclusive access. Let's connect and discuss your business transformation!",
    contactButton: "Contact Now",
    contactLocked: "Contact available after present is received",
    newMessage: "New message!",
  },
  pt: {
    messages: [
      "Pronto para levar seu negócio ao próximo nível?",
      "Descubra as estratégias que impulsionam o crescimento real!",
      "Sua história de sucesso começa com a orientação certa.",
      "Complete a jornada para desbloquear insights premium!",
    ],
    completedMessage:
      "🎉 Parabéns! Você desbloqueou acesso exclusivo. Vamos nos conectar e discutir a transformação do seu negócio!",
    contactButton: "Contatar Agora",
    contactLocked: "Contato disponível após receber o presente",
    newMessage: "Nova mensagem!",
  },
  es: {
    messages: [
      "¿Listo para llevar tu negocio al siguiente nivel?",
      "¡Descubre las estrategias que impulsan el crecimiento real!",
      "Tu historia de éxito comienza con la orientación correcta.",
      "¡Completa el viaje para desbloquear insights premium!",
    ],
    completedMessage:
      "🎉 ¡Felicidades! Has desbloqueado acceso exclusivo. ¡Conectemos y discutamos la transformación de tu negocio!",
    contactButton: "Contactar Ahora",
    contactLocked: "Contacto disponible después de recibir el regalo",
    newMessage: "¡Nuevo mensaje!",
  },
}

export default function FloatingMessageButton({ quizCompleted, language }: FloatingMessageButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [hasShownCompletedMessage, setHasShownCompletedMessage] = useState(false)
  const [messageCount, setMessageCount] = useState(1)
  const [showNewMessageEffect, setShowNewMessageEffect] = useState(false)
  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const newMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { firstName } = useUser()

  const t = translations[language] || translations.en

  useEffect(() => {
    setIsMounted(true)

    // Show completed message when quiz is finished
    if (quizCompleted && !hasShownCompletedMessage) {
      setHasShownCompletedMessage(true)
      setIsOpen(true)
    }

    // Schedule new messages every 30-60 seconds when modal is closed
    const scheduleNewMessage = () => {
      if (newMessageTimeoutRef.current) clearTimeout(newMessageTimeoutRef.current)

      const randomTime = Math.floor(Math.random() * 30000) + 30000 // 30-60 seconds
      newMessageTimeoutRef.current = setTimeout(() => {
        if (!isOpen) {
          setMessageCount((prev) => Math.min(prev + 1, 9))
          setShowNewMessageEffect(true)

          // Reset effect after animation
          setTimeout(() => {
            setShowNewMessageEffect(false)
          }, 2000)
        }
        scheduleNewMessage()
      }, randomTime)
    }

    scheduleNewMessage()

    return () => {
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current)
      if (newMessageTimeoutRef.current) clearTimeout(newMessageTimeoutRef.current)
    }
  }, [isOpen, quizCompleted, hasShownCompletedMessage])

  // Rotate messages when modal is open
  useEffect(() => {
    if (isOpen && !quizCompleted) {
      messageIntervalRef.current = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % t.messages.length)
      }, 4000)
    } else if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current)
    }

    return () => {
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current)
    }
  }, [isOpen, quizCompleted, t.messages.length])

  const handleContactClick = () => {
    if (quizCompleted) {
      const contactEvent = new CustomEvent("navigateToSection", {
        detail: { section: "contact" },
      })
      window.dispatchEvent(contactEvent)
      setIsOpen(false)
    }
  }

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setMessageCount(0)
      setShowNewMessageEffect(false)
    }
  }

  if (!isMounted) return null

  // Safely personalize messages if we have the user's first name
  const personalizedMessages =
    firstName && firstName.trim()
      ? t.messages.map((msg) => {
          if (msg.startsWith("Ready")) return `${firstName}, ${msg.toLowerCase()}`
          if (msg.startsWith("Your")) return `${firstName}, ${msg.toLowerCase()}`
          return msg
        })
      : t.messages

  const personalizedCompletedMessage =
    firstName && firstName.trim()
      ? t.completedMessage.replace("Congratulations!", `Congratulations, ${firstName}!`)
      : t.completedMessage

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-24 right-6 z-50"
      >
        <Button
          onClick={handleButtonClick}
          size="icon"
          className={`rounded-full w-14 h-14 shadow-lg transition-all duration-300 relative ${
            isOpen ? "bg-gray-700 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
          } ${showNewMessageEffect ? "message-glow" : ""}`}
        >
          {isOpen ? <X size={22} /> : <MessageCircle size={22} />}

          {/* Notification Badge */}
          {messageCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {messageCount}
            </span>
          )}
        </Button>
      </motion.div>

      {/* Message Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-44 right-6 z-50 w-80 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl overflow-hidden"
          >
            <div className="p-5">
              <div className="mb-5 min-h-[60px]">
                {quizCompleted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-sm leading-relaxed"
                  >
                    {personalizedCompletedMessage}
                  </motion.div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentMessage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-white text-sm leading-relaxed"
                    >
                      {personalizedMessages[currentMessage]}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleContactClick}
                  disabled={!quizCompleted}
                  className={`w-full transition-all duration-300 ${
                    quizCompleted
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {t.contactButton}
                </Button>

                <p className="text-xs text-center text-gray-400 leading-relaxed">{t.contactLocked}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
