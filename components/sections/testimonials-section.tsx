"use client"

import { motion } from "framer-motion"
import type { Language } from "@/app/page"
import { Star } from "lucide-react"

interface TestimonialsSectionProps {
  language: Language
}

const translations = {
  en: {
    title: "Client Success Stories",
    subtitle: "What our premium clients say about working with us",
    testimonials: [
      {
        name: "Marcus Johnson",
        role: "CEO, TechVenture Inc.",
        content:
          "João transformed our digital presence completely. Our website conversions increased by 340% and our paid traffic campaigns are generating qualified leads consistently.",
        rating: 5,
      },
      {
        name: "Sarah Williams",
        role: "Founder, Luxury Brands Co.",
        content:
          "Working with João was a game-changer for our business. His strategic approach to social media management helped us build a premium brand presence.",
        rating: 5,
      },
      {
        name: "Roberto Silva",
        role: "Director, Global Solutions",
        content:
          "The level of professionalism and expertise João brings is unmatched. Our ROI on digital marketing campaigns has never been higher.",
        rating: 5,
      },
    ],
  },
  pt: {
    title: "Histórias de Sucesso dos Clientes",
    subtitle: "O que nossos clientes premium dizem sobre trabalhar conosco",
    testimonials: [
      {
        name: "Marcus Johnson",
        role: "CEO, TechVenture Inc.",
        content:
          "João transformou completamente nossa presença digital. Nossas conversões do website aumentaram 340% e nossas campanhas de tráfego pago estão gerando leads qualificados consistentemente.",
        rating: 5,
      },
      {
        name: "Sarah Williams",
        role: "Fundadora, Luxury Brands Co.",
        content:
          "Trabalhar com João foi um divisor de águas para nosso negócio. Sua abordagem estratégica para gestão de redes sociais nos ajudou a construir uma presença de marca premium.",
        rating: 5,
      },
      {
        name: "Roberto Silva",
        role: "Diretor, Global Solutions",
        content:
          "O nível de profissionalismo e expertise que João traz é incomparável. Nosso ROI em campanhas de marketing digital nunca foi tão alto.",
        rating: 5,
      },
    ],
  },
}

export default function TestimonialsSection({ language }: TestimonialsSectionProps) {
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
        {t.testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-500"
          >
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed italic text-sm">"{testimonial.content}"</p>

            <div className="border-t border-white/10 pt-4">
              <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
              <p className="text-xs text-gray-400">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
