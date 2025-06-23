"use client"

import { motion } from "framer-motion"
import type { Language } from "@/app/page"

interface AboutSectionProps {
  language: Language
}

const translations = {
  en: {
    title: "About João Vittor",
    mission: "Mission & Values",
    missionText:
      "Dedicated to empowering entrepreneurs and businesses to achieve extraordinary growth through strategic digital marketing and innovative web solutions.",
    values: [
      {
        title: "Excellence",
        description: "Delivering premium quality in every project, exceeding client expectations consistently.",
      },
      {
        title: "Innovation",
        description: "Staying ahead of digital trends to provide cutting-edge solutions for modern businesses.",
      },
      {
        title: "Results",
        description: "Focus on measurable outcomes that drive real business growth and ROI.",
      },
    ],
    experience: "5+ Years Experience",
    clients: "100+ Satisfied Clients",
    projects: "200+ Successful Projects",
  },
  pt: {
    title: "Sobre João Vittor",
    mission: "Missão & Valores",
    missionText:
      "Dedicado a capacitar empreendedores e empresas para alcançar crescimento extraordinário através de marketing digital estratégico e soluções web inovadoras.",
    values: [
      {
        title: "Excelência",
        description:
          "Entregando qualidade premium em cada projeto, superando consistentemente as expectativas dos clientes.",
      },
      {
        title: "Inovação",
        description:
          "Mantendo-se à frente das tendências digitais para fornecer soluções de ponta para negócios modernos.",
      },
      {
        title: "Resultados",
        description: "Foco em resultados mensuráveis que impulsionam o crescimento real dos negócios e ROI.",
      },
    ],
    experience: "5+ Anos de Experiência",
    clients: "100+ Clientes Satisfeitos",
    projects: "200+ Projetos Bem-sucedidos",
  },
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = translations[language]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.title}</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-5 order-2 lg:order-1"
        >
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">{t.mission}</h3>
            <p className="text-gray-300 leading-relaxed text-base">{t.missionText}</p>
          </div>

          <div className="space-y-3">
            {t.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="border-l-4 border-blue-500 pl-4"
              >
                <h4 className="text-lg font-semibold mb-1">{value.title}</h4>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-5 order-1 lg:order-2"
        >
          <div className="relative flex justify-center">
            <img
              src="/placeholder.svg?height=320&width=260"
              alt="João Vittor - Professional Portrait"
              className="w-full max-w-xs mx-auto rounded-2xl shadow-2xl"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: t.experience, value: "5+" },
              { label: t.clients, value: "100+" },
              { label: t.projects, value: "200+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10"
              >
                <div className="text-xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
