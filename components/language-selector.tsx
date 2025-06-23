"use client"
import type { Language } from "@/app/page"

interface LanguageSelectorProps {
  language: Language
  onLanguageChange: (language: Language) => void
  label?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function LanguageSelector({
  language,
  onLanguageChange,
  label,
  size = "md",
  className = "",
}: LanguageSelectorProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-2",
    lg: "text-base px-4 py-3",
  }

  const buttonSizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <p className={`text-gray-400 ${sizeClasses[size]}`}>{label}</p>}
      <div className="flex items-center bg-white/5 backdrop-blur-lg rounded-full p-1 border border-white/10">
        <button
          onClick={() => onLanguageChange("en")}
          className={`${buttonSizeClasses[size]} rounded-full font-medium transition-all duration-300 ${
            language === "en" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => onLanguageChange("pt")}
          className={`${buttonSizeClasses[size]} rounded-full font-medium transition-all duration-300 ${
            language === "pt" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          PT
        </button>
        <button
          onClick={() => onLanguageChange("es")}
          className={`${buttonSizeClasses[size]} rounded-full font-medium transition-all duration-300 ${
            language === "es" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          ES
        </button>
      </div>
    </div>
  )
}
