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
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
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
            {isMounted && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-blue-500/20"
                style={{ width: "120%", height: "120%", left: "-10%", top: "-10%" }}
              />
            )}
            <img
              src="/placeholder.svg?height=280&width=280"
              alt="João Vittor - Professional Portrait"
              className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-blue-500/30 shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
