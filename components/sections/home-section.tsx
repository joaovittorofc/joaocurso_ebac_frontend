"use client"

import { motion } from "framer-motion"
import type { Language } from "@/app/page"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface HomeSectionProps {
  language: Language
}

const translations = {
  en: {
    headline: "Digital Marketing Strategist",
    subheadline: "& Web Developer",
    mission:
      "Transforming businesses through strategic digital solutions and cutting-edge web development. Specialized in high-end client acquisition and premium brand positioning.",
    cta: "Schedule Your Consultation",
  },
  pt: {
    headline: "Estrategista de Marketing Digital",
    subheadline: "& Desenvolvedor Web",
    mission:
      "Transformando negócios através de soluções digitais estratégicas e desenvolvimento web de ponta. Especializado em aquisição de clientes premium e posicionamento de marca de alto padrão.",
    cta: "Agende Sua Consultoria",
  },
  es: {
    headline: "Estratega de Marketing Digital",
    subheadline: "& Desarrollador Web",
    mission:
      "Transformando negocios a través de soluciones digitales estratégicas y desarrollo web de vanguardia. Especializado en adquisición de clientes premium y posicionamiento de marca de alto nivel.",
    cta: "Programe Su Consulta",
  },
}

export default function HomeSection({ language }: HomeSectionProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const t = translations[language] || translations.en

  const handleCTAClick = () => {
    const contactEvent = new CustomEvent("navigateToSection", {
      detail: { section: "contact" },
    })
    window.dispatchEvent(contactEvent)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-center lg:text-left"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              João Vittor
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl text-blue-400 font-light"
            >
              {t.headline}
              <br />
              {t.subheadline}
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-base md:text-lg text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            {t.mission}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              onClick={handleCTAClick}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              {t.cta}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center order-first lg:order-last"
        >
          <div className="relative">
            {/* Animated background rings */}
            {isMounted && (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-blue-500/20"
                  style={{ width: "120%", height: "120%", left: "-10%", top: "-10%" }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-purple-500/15"
                  style={{ width: "140%", height: "140%", left: "-20%", top: "-20%" }}
                />
              </>
            )}

            {/* Glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl scale-110" />

            {/* Main portrait */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative z-10">
              <img
                src="/images/joao-vittor-portrait.png"
                alt="João Vittor - Professional Portrait"
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-white/20 shadow-2xl backdrop-blur-sm"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
                }}
              />
            </motion.div>

            {/* Floating elements */}
            {isMounted && (
              <>
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute top-4 right-4 w-6 h-6 bg-blue-400/30 rounded-full blur-sm"
                />
                <motion.div
                  animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute bottom-8 left-4 w-4 h-4 bg-purple-400/30 rounded-full blur-sm"
                />
                <motion.div
                  animate={{ y: [-5, 15, -5], rotate: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute top-1/2 -right-2 w-3 h-3 bg-cyan-400/30 rounded-full blur-sm"
                />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
