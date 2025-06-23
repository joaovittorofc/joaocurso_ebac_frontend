"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import HomeSection from "@/components/sections/home-section"
import AboutSection from "@/components/sections/about-section"
import ServicesSection from "@/components/sections/services-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import QuizSection from "@/components/sections/quiz-section"
import ContactSection from "@/components/sections/contact-section"
import NotificationPopup from "@/components/notification-popup"
import LanguageToggle from "@/components/language-toggle"
import MouseGlow from "@/components/mouse-glow"
import OnboardingFunnel from "@/components/onboarding/onboarding-funnel"
import FloatingMessageButton from "@/components/floating-message-button"
import NameCollectionModal from "@/components/name-collection-modal"
import { LanguageProvider } from "@/contexts/language-context"
import { UserProvider } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"

export type Language = "en" | "pt" | "es"
export type Section = "home" | "about" | "services" | "testimonials" | "quiz" | "contact"

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState<Section>("home")
  const [language, setLanguage] = useState<Language>("en")
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showNameModal, setShowNameModal] = useState(true)
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sectionIdleTime, setSectionIdleTime] = useState(0)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)

    // Load language preference first
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }

    // Check screen size for mobile view
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Check if name has been collected
    const storedName = localStorage.getItem("userName")
    if (storedName && typeof storedName === "string" && storedName.trim()) {
      setUserName(storedName.trim())
      setShowNameModal(false)
    }

    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted") === "true"
    setShowOnboarding(!onboardingCompleted && !showNameModal)

    // Check if quiz has been completed
    const quizCompletedStatus = localStorage.getItem("quizCompleted") === "true"
    setQuizCompleted(quizCompletedStatus)

    // Listen for navigation events from floating button
    const handleNavigateToSection = (e: CustomEvent) => {
      const { section } = e.detail
      if (section) {
        setCurrentSection(section as Section)
        resetIdleTimer()
      }
    }

    window.addEventListener("navigateToSection", handleNavigateToSection as EventListener)
    setIsLoading(false)

    return () => {
      window.removeEventListener("navigateToSection", handleNavigateToSection as EventListener)
      window.removeEventListener("resize", checkMobile)
      if (idleTimerRef.current) clearInterval(idleTimerRef.current)
    }
  }, [showNameModal])

  // Track idle time in current section for mobile
  useEffect(() => {
    resetIdleTimer()

    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current)
    }
  }, [currentSection])

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearInterval(idleTimerRef.current)
    setSectionIdleTime(0)

    idleTimerRef.current = setInterval(() => {
      setSectionIdleTime((prev) => prev + 1)
    }, 1000)
  }

  const handleSectionChange = (section: Section) => {
    if (section === "contact" && !quizCompleted) return
    if (section === "quiz") {
      setShowQuiz(true)
      return
    }
    setCurrentSection(section)
    setShowQuiz(false)
    resetIdleTimer()
  }

  const handleNextSection = () => {
    const sections: Section[] = ["home", "about", "services", "testimonials", "quiz", "contact"]
    const currentIndex = sections.indexOf(currentSection)

    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1]
      if (nextSection === "contact" && !quizCompleted) {
        handleSectionChange("quiz")
      } else {
        handleSectionChange(nextSection)
      }
    }
  }

  const handlePrevSection = () => {
    const sections: Section[] = ["home", "about", "services", "testimonials", "quiz", "contact"]
    const currentIndex = sections.indexOf(currentSection)

    if (currentIndex > 0) {
      handleSectionChange(sections[currentIndex - 1])
    }
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true)
    localStorage.setItem("quizCompleted", "true")
    setShowQuiz(false)
    setCurrentSection("contact")
    resetIdleTimer()
  }

  const handleNameCollected = (name: string) => {
    const safeName = name && typeof name === "string" ? name.trim() : ""
    setUserName(safeName)
    setShowNameModal(false)

    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted") === "true"
    setShowOnboarding(!onboardingCompleted)
  }

  const handleSkipNameCollection = () => {
    setShowNameModal(false)

    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted") === "true"
    setShowOnboarding(!onboardingCompleted)
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  const handleShowOnboarding = () => {
    setShowOnboarding(true)
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("preferredLanguage", newLanguage)
  }

  const sectionVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  }

  // Show a simple loading state during SSR
  if (!isMounted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <LanguageProvider>
      <UserProvider userName={userName}>
        {showNameModal && <NameCollectionModal onComplete={handleNameCollected} onSkip={handleSkipNameCollection} />}

        {showOnboarding && <OnboardingFunnel onComplete={handleOnboardingComplete} />}

        <div className="relative w-screen h-screen bg-black text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <MouseGlow />
          <LanguageToggle language={language} onLanguageChange={handleLanguageChange} />

          <Button
            onClick={handleShowOnboarding}
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 md:top-8 md:left-8 text-white/70 hover:text-white hover:bg-white/10 z-50"
          >
            <HelpCircle size={20} />
          </Button>

          <NotificationPopup language={language} />

          {/* Main Content Container */}
          <div className="absolute inset-0 pb-32">
            <div className="w-full h-full">
              <AnimatePresence mode="wait">
                {showQuiz ? (
                  <motion.div
                    key="quiz"
                    variants={sectionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    <div className="w-full h-full overflow-y-auto vertical-scroll">
                      <div className="min-h-full flex items-center justify-center py-10 px-4 md:px-8 lg:px-16">
                        <QuizSection
                          language={language}
                          onComplete={handleQuizComplete}
                          onClose={() => setShowQuiz(false)}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentSection}
                    variants={sectionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    <div className="w-full h-full overflow-y-auto vertical-scroll">
                      <div className="min-h-full flex items-center justify-center py-10 px-4 md:px-8 lg:px-16">
                        {currentSection === "home" && <HomeSection language={language} />}
                        {currentSection === "about" && <AboutSection language={language} />}
                        {currentSection === "services" && <ServicesSection language={language} />}
                        {currentSection === "testimonials" && <TestimonialsSection language={language} />}
                        {currentSection === "contact" && <ContactSection language={language} />}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <FloatingMessageButton quizCompleted={quizCompleted} language={language} />

          {/* Mobile Navigation Arrows */}
          {isMobile && (
            <>
              <motion.button
                onClick={handlePrevSection}
                className="fixed bottom-6 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={currentSection === "home"}
              >
                <ChevronLeft size={20} className={currentSection === "home" ? "text-gray-500" : "text-white"} />
              </motion.button>

              <motion.button
                onClick={handleNextSection}
                className={`fixed bottom-6 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 ${
                  sectionIdleTime > 60 ? "next-arrow-glow" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={currentSection === "contact"}
              >
                <ChevronRight
                  size={20}
                  className={`${currentSection === "contact" ? "text-gray-500" : "text-white"} ${
                    sectionIdleTime > 60 ? "animate-pulse" : ""
                  }`}
                />
              </motion.button>
            </>
          )}

          {/* Navigation - Bottom Center, 50% width */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-1/2 max-w-2xl">
            <Navbar
              currentSection={currentSection}
              onSectionChange={handleSectionChange}
              quizCompleted={quizCompleted}
              language={language}
              isMobile={isMobile}
              showNextIndicator={sectionIdleTime > 60}
            />
          </div>
        </div>
      </UserProvider>
    </LanguageProvider>
  )
}
