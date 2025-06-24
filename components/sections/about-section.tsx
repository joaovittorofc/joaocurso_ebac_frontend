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
    expertise: "Core Expertise",
    expertiseList: [
      "Digital Marketing Strategy",
      "Web Development & Design",
      "Paid Traffic Management",
      "Social Media Marketing",
      "SEO & Content Strategy",
      "Brand Development",
    ],
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
    expertise: "Principais Especialidades",
    expertiseList: [
      "Estratégia de Marketing Digital",
      "Desenvolvimento & Design Web",
      "Gestão de Tráfego Pago",
      "Marketing de Redes Sociais",
      "SEO & Estratégia de Conteúdo",
      "Desenvolvimento de Marca",
    ],
  },
  es: {
    title: "Sobre João Vittor",
    mission: "Misión & Valores",
    missionText:
      "Dedicado a capacitar emprendedores y empresas para alcanzar crecimiento extraordinario a través de marketing digital estratégico y soluciones web innovadoras.",
    values: [
      {
        title: "Excelencia",
        description:
          "Entregando calidad premium en cada proyecto, superando consistentemente las expectativas de los clientes.",
      },
      {
        title: "Innovación",
        description:
          "Manteniéndose a la vanguardia de las tendencias digitales para proporcionar soluciones de vanguardia para negocios modernos.",
      },
      {
        title: "Resultados",
        description: "Enfoque en resultados medibles que impulsan el crecimiento real del negocio y ROI.",
      },
    ],
    experience: "5+ Años de Experiencia",
    clients: "100+ Clientes Satisfechos",
    projects: "200+ Proyectos Exitosos",
    expertise: "Especialidades Principales",
    expertiseList: [
      "Estrategia de Marketing Digital",
      "Desarrollo & Diseño Web",
      "Gestión de Tráfico Pagado",
      "Marketing en Redes Sociales",
      "SEO & Estrategia de Contenido",
      "Desarrollo de Marca",
    ],
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
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.title}</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 order-2 lg:order-1"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">{t.mission}</h3>
            <p className="text-gray-300 leading-relaxed text-base mb-6">{t.missionText}</p>
          </div>

          <div className="space-y-4">
            {t.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="border-l-4 border-blue-500 pl-4 bg-white/5 rounded-r-lg p-4"
              >
                <h4 className="text-lg font-semibold mb-2 text-white">{value.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Core Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <h4 className="text-lg font-semibold mb-4 text-blue-400">{t.expertise}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.expertiseList.map((skill, index) => (
                <div key={index} className="flex items-center text-sm text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Image and Stats Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6 order-1 lg:order-2"
        >
          {/* Professional Portrait */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Glowing backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl scale-110" />

              {/* Main image */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative z-10">
                <img
                  src="/images/joao-vittor-about.png"
                  alt="João Vittor - Professional Business Portrait"
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl border-2 border-white/20"
                  style={{
                    filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))",
                  }}
                />
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-4 -right-4 w-8 h-8 border-2 border-blue-400/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-purple-400/30 rounded-full"
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: t.experience, value: "5+", color: "text-blue-400" },
              { label: t.clients, value: "100+", color: "text-green-400" },
              { label: t.projects, value: "200+", color: "text-purple-400" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-gray-400 leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Professional Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-white/10"
          >
            <div className="text-4xl text-blue-400 mb-2">"</div>
            <p className="text-gray-300 italic text-sm leading-relaxed">
              {language === "en" &&
                "Success in digital marketing isn't just about traffic—it's about creating meaningful connections that drive real business growth."}
              {language === "pt" &&
                "O sucesso no marketing digital não é apenas sobre tráfego—é sobre criar conexões significativas que impulsionam o crescimento real dos negócios."}
              {language === "es" &&
                "El éxito en marketing digital no se trata solo de tráfico—se trata de crear conexiones significativas que impulsen el crecimiento real del negocio."}
            </p>
            <div className="text-right mt-3">
              <span className="text-blue-400 font-semibold text-sm">— João Vittor</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
