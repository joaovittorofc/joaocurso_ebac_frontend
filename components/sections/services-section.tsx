"use client"

import { motion } from "framer-motion"
import type { Language } from "@/app/page"
import { Globe, TrendingUp, Share2 } from "lucide-react"

interface ServicesSectionProps {
  language: Language
}

const translations = {
  en: {
    title: "Premium Services",
    subtitle: "Elevating your business through strategic digital solutions",
    services: [
      {
        icon: Globe,
        title: "Website Development",
        description: "Custom, high-performance websites that convert visitors into customers.",
        features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Conversion Focused"],
      },
      {
        icon: TrendingUp,
        title: "Paid Traffic Management",
        description: "Strategic advertising campaigns that deliver qualified leads and maximize ROI.",
        features: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "ROI Optimization"],
      },
      {
        icon: Share2,
        title: "Social Media Management",
        description: "Build and engage your audience with compelling content and strategic presence.",
        features: ["Content Strategy", "Community Management", "Brand Building", "Analytics & Reporting"],
      },
    ],
  },
  pt: {
    title: "Serviços Premium",
    subtitle: "Elevando seu negócio através de soluções digitais estratégicas",
    services: [
      {
        icon: Globe,
        title: "Desenvolvimento de Websites",
        description: "Websites personalizados e de alta performance que convertem visitantes em clientes.",
        features: ["Design Responsivo", "SEO Otimizado", "Carregamento Rápido", "Foco em Conversão"],
      },
      {
        icon: TrendingUp,
        title: "Gestão de Tráfego Pago",
        description: "Campanhas publicitárias estratégicas que entregam leads qualificados e maximizam o ROI.",
        features: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Otimização de ROI"],
      },
      {
        icon: Share2,
        title: "Gestão de Redes Sociais",
        description: "Construa e engaje sua audiência com conteúdo atrativo e presença estratégica.",
        features: ["Estratégia de Conteúdo", "Gestão de Comunidade", "Construção de Marca", "Analytics e Relatórios"],
      },
    ],
  },
}

export default function ServicesSection({ language }: ServicesSectionProps) {
  const t = translations[language]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.title}</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {t.services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            className="group"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/10 h-full">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                <service.icon size={24} className="text-blue-400" />
              </div>

              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed text-sm">{service.description}</p>

              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-xs text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
