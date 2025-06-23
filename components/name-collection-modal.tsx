"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import LanguageSelector from "@/components/language-selector"
import type { Language } from "@/app/page"

interface NameCollectionModalProps {
  onComplete: (name: string) => void
  onSkip: () => void
}

export default function NameCollectionModal({ onComplete, onSkip }: NameCollectionModalProps) {
  const [name, setName] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const { language, setLanguage, translations } = useLanguage()

  const t = translations.nameCollection || {
    title: "Welcome! To enhance your experience, tell me your name.",
    placeholder: "Your name",
    continue: "Continue",
    skip: "Skip tutorial",
    languageLabel: "Choose your language:",
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      localStorage.setItem("userName", name.trim())
      onComplete(name.trim())
    }
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  if (!isMounted) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-md p-6 bg-gray-900/90 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl"
        >
          <div className="absolute top-3 right-3">
            <Button
              onClick={onSkip}
              variant="ghost"
              size="sm"
              className="text-xs text-gray-400 hover:text-white hover:bg-white/10"
            >
              {t.skip}
            </Button>
          </div>

          <div className="text-center mb-6 mt-4">
            <h2 className="text-xl font-semibold text-white mb-4 leading-relaxed">{t.title}</h2>
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <LanguageSelector
              language={language}
              onLanguageChange={handleLanguageChange}
              label={t.languageLabel}
              size="sm"
              className="text-center"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.placeholder}
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              autoFocus
            />

            <Button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-500/50 disabled:text-white/50"
            >
              {t.continue}
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
