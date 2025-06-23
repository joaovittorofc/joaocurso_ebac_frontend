"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/app/page"

interface LanguageToggleProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

export default function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  const { setLanguage } = useLanguage()

  const handleLanguageChange = (newLanguage: Language) => {
    onLanguageChange(newLanguage)
    setLanguage(newLanguage)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 right-4 md:top-8 md:right-8 z-50"
    >
      <div className="flex items-center bg-white/5 backdrop-blur-lg rounded-full p-1 border border-white/10">
        <button
          onClick={() => handleLanguageChange("en")}
          className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
            language === "en" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange("pt")}
          className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
            language === "pt" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          PT
        </button>
        <button
          onClick={() => handleLanguageChange("es")}
          className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
            language === "es" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          ES
        </button>
      </div>
    </motion.div>
  )
}
