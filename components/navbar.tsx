"use client"

import { motion } from "framer-motion"
import { Home, User, Briefcase, MessageSquare, Gift, Mail, ChevronLeft, ChevronRight, FolderOpen } from "lucide-react"
import type { Language, Section } from "@/app/page"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState, useRef } from "react"

interface NavbarProps {
  currentSection: Section
  onSectionChange: (section: Section) => void
  quizCompleted: boolean
  language: Language
  isMobile: boolean
  showNextIndicator?: boolean
}

const defaultTranslations = {
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    testimonials: "Testimonials",
    contact: "Contact",
    portfolio: "Portfolio",
  },
  pt: {
    home: "Início",
    about: "Sobre",
    services: "Serviços",
    testimonials: "Depoimentos",
    contact: "Contato",
    portfolio: "Portfólio",
  },
  es: {
    home: "Inicio",
    about: "Sobre mí",
    services: "Servicios",
    testimonials: "Testimonios",
    contact: "Contacto",
    portfolio: "Portafolio",
  },
}

export default function Navbar({
  currentSection,
  onSectionChange,
  quizCompleted,
  language,
  isMobile,
  showNextIndicator = false,
}: NavbarProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isNearby, setIsNearby] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const { translations: contextTranslations } = useLanguage()
  const navTranslations = contextTranslations?.navbar || defaultTranslations[language] || defaultTranslations.en

  useEffect(() => {
    setIsMounted(true)

    // Track mouse position for proximity detection
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))

        // Consider "nearby" if within 150px of the navbar center
        setIsNearby(distance < 150)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const navItems = [
    { id: "home" as Section, icon: Home, label: navTranslations.home },
    { id: "about" as Section, icon: User, label: navTranslations.about },
    { id: "services" as Section, icon: Briefcase, label: navTranslations.services },
    { id: "testimonials" as Section, icon: MessageSquare, label: navTranslations.testimonials },
    { id: "portfolio" as Section, icon: FolderOpen, label: navTranslations.portfolio },
    { id: "quiz" as Section, icon: Gift, label: "", isGift: true },
    { id: "contact" as Section, icon: Mail, label: navTranslations.contact, disabled: !quizCompleted },
  ]

  // For mobile view, only show current section
  const displayItems = isMobile ? navItems.filter((item) => item.id === currentSection) : navItems

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full"
    >
      <motion.div
        animate={{
          scale: isHovered || isNearby ? 1 : 0.9,
          height: isHovered || isNearby ? "4rem" : "3.5rem",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative bg-white/5 backdrop-blur-2xl rounded-full shadow-2xl overflow-hidden border border-white/20"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Liquid glass overlay effect */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)",
          }}
        />

        {/* Animated liquid ripple effect */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Animated border beam */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 rounded-full border border-transparent animated-border-beam"></div>
        </div>

        {/* Content */}
        <div className="flex items-center justify-center gap-2 md:gap-4 lg:gap-6 px-4 md:px-6 lg:px-8 h-full relative z-10">
          {displayItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              disabled={item.disabled}
              animate={{
                scale: isHovered || isNearby ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={`relative flex flex-col items-center gap-1 p-2 md:p-3 rounded-xl transition-all duration-300 ${
                currentSection === item.id
                  ? "bg-blue-500/20 text-blue-400"
                  : item.disabled
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-white/70 hover:text-white hover:bg-white/10"
              } ${item.isGift ? "text-yellow-400 hover:text-yellow-300" : ""}`}
              whileHover={!item.disabled ? { scale: isHovered || isNearby ? 1.15 : 1.1 } : {}}
              whileTap={!item.disabled ? { scale: 0.95 } : {}}
            >
              <item.icon size={18} />
              {item.label && !isMobile && (
                <motion.span
                  animate={{
                    opacity: isHovered || isNearby ? 1 : 0,
                    height: isHovered || isNearby ? "auto" : 0,
                  }}
                  className="text-xs font-medium overflow-hidden whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
              {item.isGift && !quizCompleted && isMounted && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mobile navigation arrows */}
      {isMobile && (
        <div className="flex items-center justify-between mt-3">
          <motion.button
            onClick={() => {
              const currentIndex = navItems.findIndex((item) => item.id === currentSection)
              if (currentIndex > 0) {
                onSectionChange(navItems[currentIndex - 1].id)
              }
            }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${
              currentSection === "home" ? "text-gray-600 cursor-not-allowed" : "text-white/70 hover:text-white"
            }`}
            disabled={currentSection === "home"}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            onClick={() => {
              const currentIndex = navItems.findIndex((item) => item.id === currentSection)
              if (currentIndex < navItems.length - 1) {
                const nextSection = navItems[currentIndex + 1].id
                if (nextSection === "contact" && !quizCompleted) {
                  onSectionChange("quiz")
                } else {
                  onSectionChange(nextSection)
                }
              }
            }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${
              currentSection === "contact" ? "text-gray-600 cursor-not-allowed" : "text-white/70 hover:text-white"
            } ${showNextIndicator ? "next-arrow-glow" : ""}`}
            disabled={currentSection === "contact"}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      )}
    </motion.nav>
  )
}
