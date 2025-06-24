"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "@/app/page"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  translations: Record<string, any>
}

const translations = {
  en: {
    nameCollection: {
      title: "Welcome! To enhance your experience, tell me your name.",
      placeholder: "Your name",
      continue: "Continue",
      skip: "Skip tutorial",
      languageLabel: "Choose your language:",
    },
    navbar: {
      home: "Home",
      about: "About",
      services: "Services",
      testimonials: "Testimonials",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    onboarding: {
      welcome: "Welcome to João Vittor's Digital Experience",
      welcomePersonalized: "Welcome, {name}, to this digital experience.",
      intro: "Let me guide you through this journey of digital transformation",
      introPersonalized: "Let me guide you on this journey!",
      skip: "Skip Tutorial",
      next: "Next",
      previous: "Back",
      finish: "Get Started",
      viewTutorial: "View Tutorial",
      steps: [
        {
          title: "Discover My Services",
          description:
            "Explore premium digital marketing and web development services designed to elevate your business to new heights.",
          instruction: "Click on the Services icon to learn more about what I offer.",
        },
        {
          title: "Learn About Me",
          description:
            "Get to know my background, expertise, and the values that drive my work in digital transformation.",
          instruction: "Click on the About icon to discover my professional journey.",
        },
        {
          title: "See Client Success Stories",
          description: "Read testimonials from satisfied clients who have transformed their businesses with my help.",
          instruction: "Click on the Testimonials icon to see real results.",
        },
        {
          title: "Unlock Premium Content",
          description: "Complete a quick quiz to access exclusive consultation opportunities and premium features.",
          instruction: "Click on the Gift icon when you're ready to unlock premium features.",
        },
        {
          title: "Ready to Transform Your Business?",
          description:
            "Let's start a conversation about your goals and how I can help you achieve extraordinary growth.",
          instruction: "Click on the Contact icon to schedule your consultation.",
        },
      ],
    },
    notifications: {
      notifications: [
        "🎉 Marcus from TechVenture just closed a $1,500 deal!",
        "💰 Sarah from Luxury Brands secured a $2,200 contract!",
        "🚀 Roberto from Global Solutions signed for $1,800!",
        "✨ New client from Miami just booked a $1,200 package!",
        "🔥 Premium consultation booked for $2,000!",
      ],
    },
  },
  pt: {
    nameCollection: {
      title: "Bem-vindo! Para melhorar sua experiência, diga-me seu nome.",
      placeholder: "Seu nome",
      continue: "Continuar",
      skip: "Pular tutorial",
      languageLabel: "Escolha seu idioma:",
    },
    navbar: {
      home: "Início",
      about: "Sobre",
      services: "Serviços",
      testimonials: "Depoimentos",
      portfolio: "Portfólio",
      contact: "Contato",
    },
    onboarding: {
      welcome: "Bem-vindo à Experiência Digital de João Vittor",
      welcomePersonalized: "Bem-vindo, {name}, a esta experiência digital.",
      intro: "Deixe-me guiá-lo nesta jornada de transformação digital",
      introPersonalized: "Deixe-me guiá-lo nesta jornada!",
      skip: "Pular Tutorial",
      next: "Próximo",
      previous: "Voltar",
      finish: "Começar",
      viewTutorial: "Ver Tutorial",
      steps: [
        {
          title: "Descubra Meus Serviços",
          description:
            "Explore serviços premium de marketing digital e desenvolvimento web projetados para elevar seu negócio a novos patamares.",
          instruction: "Clique no ícone de Serviços para saber mais sobre o que ofereço.",
        },
        {
          title: "Conheça-me",
          description:
            "Conheça minha experiência, expertise e os valores que impulsionam meu trabalho na transformação digital.",
          instruction: "Clique no ícone Sobre para descobrir minha jornada profissional.",
        },
        {
          title: "Veja Histórias de Sucesso dos Clientes",
          description: "Leia depoimentos de clientes satisfeitos que transformaram seus negócios com minha ajuda.",
          instruction: "Clique no ícone de Depoimentos para ver resultados reais.",
        },
        {
          title: "Desbloqueie Conteúdo Premium",
          description:
            "Complete um quiz rápido para acessar oportunidades exclusivas de consultoria e recursos premium.",
          instruction: "Clique no ícone de Presente quando estiver pronto para desbloquear recursos premium.",
        },
        {
          title: "Pronto para Transformar seu Negócio?",
          description:
            "Vamos iniciar uma conversa sobre seus objetivos e como posso ajudá-lo a alcançar crescimento extraordinário.",
          instruction: "Clique no ícone de Contato para agendar sua consultoria.",
        },
      ],
    },
    notifications: {
      notifications: [
        "🎉 Marcus da TechVenture fechou um negócio de $1,500!",
        "💰 Sarah da Luxury Brands garantiu um contrato de $2,200!",
        "🚀 Roberto da Global Solutions assinou por $1,800!",
        "✨ Novo cliente de Miami reservou um pacote de $1,200!",
        "🔥 Consultoria premium reservada por $2,000!",
      ],
    },
  },
  es: {
    nameCollection: {
      title: "¡Bienvenido! Para mejorar tu experiencia, dime tu nombre.",
      placeholder: "Tu nombre",
      continue: "Continuar",
      skip: "Saltar tutorial",
      languageLabel: "Elige tu idioma:",
    },
    navbar: {
      home: "Inicio",
      about: "Sobre mí",
      services: "Servicios",
      testimonials: "Testimonios",
      portfolio: "Portafolio",
      contact: "Contacto",
    },
    onboarding: {
      welcome: "Bienvenido a la Experiencia Digital de João Vittor",
      welcomePersonalized: "Bienvenido, {name}, a esta experiencia digital.",
      intro: "Permíteme guiarte en este viaje de transformación digital",
      introPersonalized: "¡Permíteme guiarte en este viaje!",
      skip: "Saltar Tutorial",
      next: "Siguiente",
      previous: "Atrás",
      finish: "Comenzar",
      viewTutorial: "Ver Tutorial",
      steps: [
        {
          title: "Descubre Mis Servicios",
          description:
            "Explora servicios premium de marketing digital y desarrollo web diseñados para elevar tu negocio a nuevas alturas.",
          instruction: "Haz clic en el icono de Servicios para conocer más sobre lo que ofrezco.",
        },
        {
          title: "Conóceme",
          description:
            "Descubre mi experiencia, conocimientos y los valores que impulsan mi trabajo en la transformación digital.",
          instruction: "Haz clic en el icono Sobre mí para descubrir mi trayectoria profesional.",
        },
        {
          title: "Ve Historias de Éxito de Clientes",
          description: "Lee testimonios de clientes satisfechos que han transformado sus negocios con mi ayuda.",
          instruction: "Haz clic en el icono de Testimonios para ver resultados reales.",
        },
        {
          title: "Desbloquea Contenido Premium",
          description:
            "Completa un cuestionario rápido para acceder a oportunidades exclusivas de consultoría y funciones premium.",
          instruction: "Haz clic en el icono de Regalo cuando estés listo para desbloquear funciones premium.",
        },
        {
          title: "¿Listo para Transformar tu Negocio?",
          description:
            "Iniciemos una conversación sobre tus objetivos y cómo puedo ayudarte a alcanzar un crecimiento extraordinario.",
          instruction: "Haz clic en el icono de Contacto para programar tu consulta.",
        },
      ],
    },
    notifications: {
      notifications: [
        "🎉 Marcus de TechVenture cerró un trato de $1,500!",
        "💰 Sarah de Luxury Brands aseguró un contrato de $2,200!",
        "🚀 Roberto de Global Solutions firmó por $1,800!",
        "✨ Nuevo cliente de Miami reservó un paquete de $1,200!",
        "🔥 Consultoría premium reservada por $2,000!",
      ],
    },
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  translations: translations.en,
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")
  const [currentTranslations, setCurrentTranslations] = useState(translations.en)

  useEffect(() => {
    // Load language preference from localStorage if available
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Update translations when language changes
    setCurrentTranslations(translations[language] || translations.en)
    // Save language preference to localStorage
    localStorage.setItem("preferredLanguage", language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  )
}
