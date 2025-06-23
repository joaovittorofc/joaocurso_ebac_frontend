"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Language } from "@/app/page"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface QuizSectionProps {
  language: Language
  onComplete: () => void
  onClose: () => void
}

const translations = {
  en: {
    title: "Unlock Your Business Potential",
    subtitle: "Answer a few questions to discover your path to success",
    questions: [
      {
        question: "What would success look like for your business in the U.S.?",
        options: [
          "Expanding to multiple locations nationwide",
          "Becoming the market leader in my industry",
          "Achieving 7-figure annual revenue",
          "Building a recognizable premium brand",
        ],
      },
      {
        question: "What would be your biggest personal reward from business growth?",
        options: [
          "Financial freedom and security",
          "Recognition as an industry expert",
          "More time with family and loved ones",
          "Making a positive impact on society",
        ],
      },
      {
        question: "How do you envision your ideal customer experience?",
        options: [
          "Seamless, premium service at every touchpoint",
          "Personalized solutions that exceed expectations",
          "Innovative technology that simplifies their life",
          "Authentic relationships built on trust",
        ],
      },
    ],
    complete: "Congratulations! You've unlocked exclusive access to premium consultation.",
    accessGranted: "Contact Access Granted!",
  },
  pt: {
    title: "Desbloqueie o Potencial do Seu Negócio",
    subtitle: "Responda algumas perguntas para descobrir seu caminho para o sucesso",
    questions: [
      {
        question: "Como seria o sucesso para o seu negócio nos EUA?",
        options: [
          "Expandir para múltiplas localizações nacionalmente",
          "Tornar-se líder de mercado na minha indústria",
          "Alcançar receita anual de 7 dígitos",
          "Construir uma marca premium reconhecida",
        ],
      },
      {
        question: "Qual seria a maior recompensa pessoal com o crescimento do seu negócio?",
        options: [
          "Liberdade e segurança financeira",
          "Reconhecimento como especialista da indústria",
          "Mais tempo com família e entes queridos",
          "Causar impacto positivo na sociedade",
        ],
      },
      {
        question: "Como você imagina a experiência ideal do seu cliente?",
        options: [
          "Serviço premium e perfeito em todos os pontos de contato",
          "Soluções personalizadas que superam expectativas",
          "Tecnologia inovadora que simplifica a vida deles",
          "Relacionamentos autênticos baseados em confiança",
        ],
      },
    ],
    complete: "Parabéns! Você desbloqueou acesso exclusivo à consultoria premium.",
    accessGranted: "Acesso ao Contato Liberado!",
  },
}

export default function QuizSection({ language, onComplete, onClose }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const t = translations[language]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < t.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 500)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    setIsComplete(true)
    setTimeout(() => {
      localStorage.setItem("quizCompleted", "true")
      onComplete()
    }, 2000)
  }

  const progress = ((currentQuestion + 1) / t.questions.length) * 100

  if (isComplete) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center space-y-6">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto"
          >
            <span className="text-3xl">🎉</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-green-400">{t.accessGranted}</h2>
          <p className="text-lg text-gray-300">{t.complete}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
      >
        <X size={20} />
      </Button>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
        <p className="text-lg text-gray-400">{t.subtitle}</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-8">
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-center mb-8">
            {t.questions[currentQuestion].question}
          </h3>

          <div className="grid gap-3 max-w-2xl mx-auto">
            {t.questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-base">{option}</span>
              </motion.button>
            ))}
          </div>

          <div className="text-center text-gray-400 text-sm">
            Question {currentQuestion + 1} of {t.questions.length}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
