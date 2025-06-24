"use client"

import { motion } from "framer-motion"
import type { Language } from "@/app/page"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, ImageIcon, Calculator, Phone, Star, Users } from "lucide-react"

interface PortfolioSectionProps {
  language: Language
}

const translations = {
  en: {
    title: "Recent Projects",
    subtitle:
      "Explore some of our latest digital solutions that have transformed businesses across various industries. Each project represents our commitment to delivering exceptional results and driving real growth for our clients.",
    viewProject: "View Project",
    projects: [
      {
        title: "BellaDerme Beauty Clinic",
        category: "Healthcare & Beauty",
        description:
          "A sophisticated website for a premium aesthetic clinic featuring online appointment booking and comprehensive service showcase.",
        features: [
          "Online appointment booking system",
          "Before & after photo gallery",
          "Integrated Google Maps location",
        ],
        tags: ["Web Development", "UI/UX Design", "Booking System"],
        results: "300% increase in online bookings",
      },
      {
        title: "ProBuild Construction Co.",
        category: "Construction & Services",
        description:
          "Professional website for a construction and painting company with project portfolio and instant quote calculator.",
        features: ["Interactive project portfolio", "Instant quote request form", "Service area coverage map"],
        tags: ["Web Development", "Lead Generation", "Portfolio"],
        results: "250% increase in qualified leads",
      },
      {
        title: "AutoMax & Premier Realty",
        category: "Automotive & Real Estate",
        description:
          "Dual-purpose platform combining car dealership inventory with real estate listings and financing tools.",
        features: [
          "Advanced search & filter system",
          "Financing calculator tools",
          "Integrated CRM for lead management",
        ],
        tags: ["E-commerce", "CRM Integration", "Financial Tools"],
        results: "180% increase in conversion rate",
      },
    ],
  },
  pt: {
    title: "Projetos Recentes",
    subtitle:
      "Explore algumas de nossas mais recentes soluções digitais que transformaram negócios em várias indústrias. Cada projeto representa nosso compromisso em entregar resultados excepcionais e impulsionar o crescimento real para nossos clientes.",
    viewProject: "Ver Projeto",
    projects: [
      {
        title: "Clínica de Estética BellaDerme",
        category: "Saúde & Beleza",
        description:
          "Um website sofisticado para uma clínica estética premium com agendamento online e showcase abrangente de serviços.",
        features: [
          "Sistema de agendamento online",
          "Galeria de fotos antes & depois",
          "Localização integrada Google Maps",
        ],
        tags: ["Desenvolvimento Web", "UI/UX Design", "Sistema de Reservas"],
        results: "300% de aumento em agendamentos online",
      },
      {
        title: "ProBuild Construção Ltda.",
        category: "Construção & Serviços",
        description:
          "Website profissional para empresa de construção e pintura com portfólio de projetos e calculadora de orçamento instantâneo.",
        features: [
          "Portfólio interativo de projetos",
          "Formulário de solicitação de orçamento",
          "Mapa de cobertura de área de serviço",
        ],
        tags: ["Desenvolvimento Web", "Geração de Leads", "Portfólio"],
        results: "250% de aumento em leads qualificados",
      },
      {
        title: "AutoMax & Premier Imóveis",
        category: "Automotivo & Imobiliário",
        description:
          "Plataforma dupla combinando inventário de concessionária com listagens imobiliárias e ferramentas de financiamento.",
        features: [
          "Sistema avançado de busca & filtros",
          "Ferramentas de calculadora de financiamento",
          "CRM integrado para gestão de leads",
        ],
        tags: ["E-commerce", "Integração CRM", "Ferramentas Financeiras"],
        results: "180% de aumento na taxa de conversão",
      },
    ],
  },
  es: {
    title: "Proyectos Recientes",
    subtitle:
      "Explora algunas de nuestras más recientes soluciones digitales que han transformado negocios en varias industrias. Cada proyecto representa nuestro compromiso de entregar resultados excepcionales e impulsar el crecimiento real para nuestros clientes.",
    viewProject: "Ver Proyecto",
    projects: [
      {
        title: "Clínica Estética BellaDerme",
        category: "Salud & Belleza",
        description:
          "Un sitio web sofisticado para una clínica estética premium con reservas online y showcase integral de servicios.",
        features: ["Sistema de reservas online", "Galería de fotos antes & después", "Ubicación integrada Google Maps"],
        tags: ["Desarrollo Web", "UI/UX Design", "Sistema de Reservas"],
        results: "300% de aumento en reservas online",
      },
      {
        title: "ProBuild Construcción S.A.",
        category: "Construcción & Servicios",
        description:
          "Sitio web profesional para empresa de construcción y pintura con portafolio de proyectos y calculadora de presupuesto instantáneo.",
        features: [
          "Portafolio interactivo de proyectos",
          "Formulario de solicitud de presupuesto",
          "Mapa de cobertura de área de servicio",
        ],
        tags: ["Desarrollo Web", "Generación de Leads", "Portafolio"],
        results: "250% de aumento en leads calificados",
      },
      {
        title: "AutoMax & Premier Inmobiliaria",
        category: "Automotriz & Inmobiliario",
        description:
          "Plataforma dual combinando inventario de concesionario con listados inmobiliarios y herramientas de financiamiento.",
        features: [
          "Sistema avanzado de búsqueda & filtros",
          "Herramientas de calculadora de financiamiento",
          "CRM integrado para gestión de leads",
        ],
        tags: ["E-commerce", "Integración CRM", "Herramientas Financieras"],
        results: "180% de aumento en tasa de conversión",
      },
    ],
  },
}

const projectIcons = [
  { icon: Calendar, color: "text-pink-400" },
  { icon: Calculator, color: "text-orange-400" },
  { icon: ImageIcon, color: "text-blue-400" },
]

export default function PortfolioSection({ language }: PortfolioSectionProps) {
  const t = translations[language]

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t.title}</h2>
        <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">{t.subtitle}</p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {t.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            className="group"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:bg-white/10 h-full flex flex-col">
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <ImageIcon
                  src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(project.title)}`}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay with icon */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={`w-16 h-16 ${projectIcons[index].color} bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center`}
                  >
                    {(() => {
                      const IconComponent = projectIcons[index].icon
                      return <IconComponent size={24} />
                    })()}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-blue-400 border border-blue-500/30">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed text-sm flex-grow">{project.description}</p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {project.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Results Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                    <Star size={12} className="text-green-400" />
                    <span className="text-xs text-green-400 font-medium">{project.results}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-400 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-500 transition-all duration-300 group-hover:scale-105"
                  variant="outline"
                >
                  <ExternalLink size={16} className="mr-2" />
                  {t.viewProject}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-16 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users size={24} className="text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Ready to Start Your Project?</h3>
        </div>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          {language === "en" &&
            "Let's discuss how we can transform your business with a custom digital solution tailored to your specific needs and goals."}
          {language === "pt" &&
            "Vamos discutir como podemos transformar seu negócio com uma solução digital personalizada para suas necessidades e objetivos específicos."}
          {language === "es" &&
            "Discutamos cómo podemos transformar tu negocio con una solución digital personalizada para tus necesidades y objetivos específicos."}
        </p>
        <Button
          onClick={() => {
            const contactEvent = new CustomEvent("navigateToSection", {
              detail: { section: "contact" },
            })
            window.dispatchEvent(contactEvent)
          }}
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
        >
          <Phone size={16} className="mr-2" />
          {language === "en" && "Start Your Project"}
          {language === "pt" && "Iniciar Seu Projeto"}
          {language === "es" && "Iniciar Tu Proyecto"}
        </Button>
      </motion.div>
    </div>
  )
}
