"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import {
  User,
  Briefcase,
  MessageSquare,
  Gift,
  Mail,
  ChevronRight,
  ChevronLeft,
  X,
  Info,
  FolderOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"

interface OnboardingFunnelProps {
  onComplete: () => void
}

export default function OnboardingFunnel({ onComplete }: OnboardingFunnelProps) {
  const { language, translations } = useLanguage()
  const { firstName } = useUser()
  const t = translations.onboarding || {
    welcome: "Welcome to João Vittor's Digital Experience",
    welcomePersonalized: "Welcome, {name}, to this digital experience.",
    intro: "Let me guide you through this journey of digital transformation",
    introPersonalized: "Let me guide you on this journey!",
    skip: "Skip Tutorial",
    next: "Next",
    previous: "Back",
    finish: "Get Started",
    viewTutorial: "View Tutorial",
    steps: [],
  }

  const [currentStep, setCurrentStep] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  const totalSteps = t.steps?.length || 5

  // Track screen size for responsive behavior
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  // Determine if we need to show modal based on screen size
  const shouldShowModal = screenSize.height < 600 || screenSize.width < 640

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsExiting(true)
    setTimeout(() => {
      localStorage.setItem("onboardingCompleted", "true")
      onComplete()
    }, 500)
  }

  const handleSkip = () => {
    setIsExiting(true)
    setTimeout(() => {
      localStorage.setItem("onboardingCompleted", "true")
      onComplete()
    }, 500)
  }

  const navIcons = [
    { icon: Briefcase, color: "bg-blue-500", name: "Services" },
    { icon: User, color: "bg-purple-500", name: "About" },
    { icon: MessageSquare, color: "bg-green-500", name: "Testimonials" },
    { icon: FolderOpen, color: "bg-orange-500", name: "Portfolio" },
    { icon: Gift, color: "bg-yellow-500", name: "Quiz" },
    { icon: Mail, color: "bg-red-500", name: "Contact" },
  ]

  // Create personalized welcome message
  const getWelcomeMessage = () => {
    if (firstName && firstName.trim()) {
      return t.welcomePersonalized?.replace("{name}", firstName) || `Welcome, ${firstName}, to this digital experience.`
    }
    return t.welcome || "Welcome to João Vittor's Digital Experience"
  }

  const getIntroMessage = () => {
    if (firstName && firstName.trim()) {
      return t.introPersonalized || "Let me guide you on this journey!"
    }
    return t.intro || "Let me guide you through this journey of digital transformation"
  }

  // Responsive content based on screen size
  const getResponsiveContent = () => {
    if (shouldShowModal) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-4">
          <div className="text-center space-y-4 max-w-sm">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{getWelcomeMessage()}</h1>
            <p className="text-blue-400 text-sm">{getIntroMessage()}</p>

            <Button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
            >
              <Info size={16} />
              {t.viewTutorial}
            </Button>

            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              {t.skip}
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 text-center py-4 px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{getWelcomeMessage()}</h1>
          <p className="text-sm md:text-base text-blue-400">{getIntroMessage()}</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-4 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Step Content Card */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 md:p-6 max-w-2xl mx-auto">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 text-white">
                  {t.steps?.[currentStep]?.title || "Step"}
                </h2>
                <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
                  {t.steps?.[currentStep]?.description || ""}
                </p>

                {/* Icon Instruction */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 ${navIcons[currentStep]?.color || "bg-blue-500"} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    {(() => {
                      const IconComponent = navIcons[currentStep]?.icon
                      return IconComponent ? <IconComponent size={16} className="text-white md:w-5 md:h-5" /> : null
                    })()}
                  </div>
                  <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                    {t.steps?.[currentStep]?.instruction || ""}
                  </p>
                </div>
              </div>

              {/* Interactive Navbar Demo */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-white/5 backdrop-blur-lg rounded-full shadow-xl border border-white/10"
                >
                  {navIcons.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <div
                        key={index}
                        className={`relative flex flex-col items-center gap-1 p-1.5 md:p-2 rounded-lg transition-all duration-300 ${
                          currentStep === index ? `${item.color}/20 text-white` : "text-white/50"
                        }`}
                      >
                        {IconComponent && <IconComponent size={16} className="md:w-5 md:h-5" />}
                        {currentStep === index && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -bottom-0.5 w-3 h-0.5 bg-blue-500 rounded-full"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    )
                  })}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">{t.previous}</span>
          </Button>

          {/* Progress Dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                  currentStep === index ? "bg-blue-500" : "bg-white/30"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            size="sm"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            <span className="hidden sm:inline">{currentStep === totalSteps - 1 ? t.finish : t.next}</span>
            {currentStep === totalSteps - 1 ? null : <ChevronRight size={14} />}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="onboarding-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#onboarding-grid)" />
            </svg>
          </div>

          {/* Skip button - always visible */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-white/70 hover:text-white flex items-center gap-2 z-50 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span className="text-sm">{t.skip}</span>
            <X size={16} />
          </button>

          {/* Main Content */}
          <div className="relative h-full w-full">{getResponsiveContent()}</div>

          {/* Modal for small screens */}
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={`${t.steps?.[currentStep]?.title || "Step"} (${currentStep + 1}/${totalSteps})`}
          >
            <div className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">{t.steps?.[currentStep]?.description || ""}</p>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <div
                  className={`w-8 h-8 ${navIcons[currentStep]?.color || "bg-blue-500"} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  {(() => {
                    const IconComponent = navIcons[currentStep]?.icon
                    return IconComponent ? <IconComponent size={16} className="text-white" /> : null
                  })()}
                </div>
                <p className="text-white/80 text-sm">{t.steps?.[currentStep]?.instruction || ""}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white disabled:opacity-50"
                >
                  <ChevronLeft size={14} />
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        currentStep === index ? "bg-blue-500" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>

                <Button onClick={handleNext} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  {currentStep === totalSteps - 1 ? t.finish : <ChevronRight size={14} />}
                </Button>
              </div>
            </div>
          </Modal>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
