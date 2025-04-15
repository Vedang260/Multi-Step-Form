import { useFormStore } from './state/formStore'
import { PersonalInfoStep } from './components/steps/PersonalInfoStep'
import { ExperienceStep } from './components/steps/ExperienceStep'
import { EducationStep } from './components/steps/EducationStep'
import { SkillsStep } from './components/steps/SkillsStep'
import { ReferencesStep } from './components/steps/ReferencesStep'
import { SummaryStep } from './components/steps/SummaryStep'
import { SubmitStep } from './components/steps/SubmitStep'
import { useAutosave } from './hooks/useAutosave'
import { useTheme } from './context/ThemeContext'
import { AnimatePresence, motion } from 'framer-motion'

const steps = [
  PersonalInfoStep,
  ExperienceStep,
  EducationStep,
  SkillsStep,
  ReferencesStep,
  SummaryStep,
  SubmitStep,
]

export const App: React.FC = () => {
  const { toggleTheme } = useTheme()
  useAutosave()
  const { step } = useFormStore()
  const StepComponent = steps[step - 1]

  return (
    <div className="min-h-screen bg-background py-10">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 rounded-md bg-primary p-2 text-white"
      >
        Toggle Theme
      </button>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex justify-between">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full ${
                index + 1 <= step ? 'bg-primary' : 'bg-gray-300'
              } ${index !== steps.length - 1 ? 'mr-2' : ''}`}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
