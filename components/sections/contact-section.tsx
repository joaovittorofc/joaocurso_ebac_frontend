"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { Language } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, CheckCircle } from "lucide-react"
import { useUser } from "@/contexts/user-context"

interface ContactSectionProps {
  language: Language
}

const translations = {
  en: {
    title: "Let's Transform Your Business",
    subtitle: "Schedule your meeting now and unlock an exclusive free consultation session!",
    form: {
      name: "Full Name",
      email: "Email Address",
      whatsapp: "WhatsApp Number",
      message: "Tell us about your project",
      submit: "Send Message",
    },
    calendar: {
      title: "Schedule Your Exclusive Consultation",
      description: "Book a 30-minute strategy session to discuss your business goals",
      button: "Schedule Meeting",
    },
    success: "🎉 Your Exclusive Consultation is Confirmed! Details will be sent to your email.",
    incentive: "Limited time: Get a FREE premium strategy session worth $500!",
  },
  pt: {
    title: "Vamos Transformar Seu Negócio",
    subtitle: "Agende sua reunião agora e ganhe uma sessão de consultoria gratuita exclusiva!",
    form: {
      name: "Nome Completo",
      email: "Endereço de Email",
      whatsapp: "Número do WhatsApp",
      message: "Conte-nos sobre seu projeto",
      submit: "Enviar Mensagem",
    },
    calendar: {
      title: "Agende Sua Consultoria Exclusiva",
      description: "Reserve uma sessão de estratégia de 30 minutos para discutir seus objetivos de negócio",
      button: "Agendar Reunião",
    },
    success: "🎉 Sua Consultoria Exclusiva Está Confirmada! Os detalhes serão enviados para seu e-mail.",
    incentive: "Tempo limitado: Ganhe uma sessão de estratégia premium GRATUITA no valor de $500!",
  },
  es: {
    title: "Transformemos Tu Negocio",
    subtitle: "¡Programa tu reunión ahora y desbloquea una sesión de consultoría gratuita exclusiva!",
    form: {
      name: "Nombre Completo",
      email: "Dirección de Correo",
      whatsapp: "Número de WhatsApp",
      message: "Cuéntanos sobre tu proyecto",
      submit: "Enviar Mensaje",
    },
    calendar: {
      title: "Programa Tu Consultoría Exclusiva",
      description: "Reserva una sesión de estrategia de 30 minutos para discutir tus objetivos de negocio",
      button: "Programar Reunión",
    },
    success: "🎉 ¡Tu Consultoría Exclusiva Está Confirmada! Los detalles serán enviados a tu correo.",
    incentive: "Tiempo limitado: ¡Obtén una sesión de estrategia premium GRATIS valorada en $500!",
  },
}

export default function ContactSection({ language }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)
  const { userName } = useUser()

  const t = translations[language] || translations.en

  // Safely pre-fill name if available
  useEffect(() => {
    if (userName && typeof userName === "string" && userName.trim() && !formData.name) {
      setFormData((prev) => ({ ...prev, name: userName.trim() }))
    }
  }, [userName, formData.name])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const handleSchedule = () => {
    setTimeout(() => {
      setIsScheduled(true)
    }, 1000)
  }

  if (isScheduled) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center space-y-6">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-green-400">Success!</h2>
          <p className="text-lg text-gray-300">{t.success}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{t.title}</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">{t.subtitle}</p>
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-6 py-2 inline-block">
          <span className="text-sm font-semibold text-blue-400">{t.incentive}</span>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4">Get In Touch</h3>

            {isSubmitted ? (
              <div className="text-center space-y-3 py-10 flex-grow flex flex-col items-center justify-center">
                <CheckCircle size={36} className="text-green-400" />
                <p className="text-green-400 font-semibold text-sm">Message sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 flex-grow flex flex-col">
                <Input
                  placeholder={t.form.name}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-10"
                  required
                />
                <Input
                  type="email"
                  placeholder={t.form.email}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-10"
                  required
                />
                <Input
                  placeholder={t.form.whatsapp}
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-10"
                  required
                />
                <Textarea
                  placeholder={t.form.message}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none flex-grow"
                  required
                />
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 h-10 mt-auto">
                  {t.form.submit}
                </Button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Calendar Booking */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <Calendar size={20} className="text-blue-400" />
              <h3 className="text-xl font-bold">{t.calendar.title}</h3>
            </div>

            <p className="text-gray-300 mb-4 text-sm">{t.calendar.description}</p>

            {/* Simulated Calendar Widget with internal scroll */}
            <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/10 flex-grow overflow-hidden flex flex-col">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs text-gray-400 py-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 overflow-y-auto vertical-scroll flex-grow">
                {Array.from({ length: 35 }, (_, i) => (
                  <button
                    key={i}
                    className={`aspect-square rounded-lg text-xs transition-colors ${
                      i > 4 && i < 32 ? "bg-white/10 hover:bg-blue-500/30 text-white" : "text-gray-600"
                    }`}
                  >
                    {i > 4 && i < 36 ? i - 4 : ""}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSchedule}
              className="w-full bg-green-500 hover:green-600 text-white py-2 h-10 mt-auto"
            >
              {t.calendar.button}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
