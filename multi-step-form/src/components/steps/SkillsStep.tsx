import { useFormStore } from '../../state/formState'
import { Button } from '../common/Button'
import { ChipInput } from '../ui/ChipInput'
import { motion } from 'framer-motion'

export const SkillsStep: React.FC = () => {
  const { skills, setSkills, nextStep, prevStep } = useFormStore()

  const predefinedSkills = [
    'React',
    'Node.js',
    'Python',
    'Docker',
    'TypeScript',
    'JavaScript',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Skills</h2>
      <ChipInput
        skills={skills}
        predefinedSkills={predefinedSkills}
        onChange={setSkills}
      />
      <div className="mt-6 flex justify-between">
        <Button onClick={prevStep} variant="secondary">
          Previous
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </motion.div>
  )
}