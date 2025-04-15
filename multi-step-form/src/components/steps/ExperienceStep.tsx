import { useState } from 'react'
import { z } from 'zod'
import { useFormStore } from '../../state/formState'
import { experienceSchema } from '../../schemas/experienceSchema'
import { hasOverlappingDates } from '../../utils/validateDates'
import { motion } from 'framer-motion'
import { Button } from '../common/Button'
import { Select } from '../common/Select'
import { TextInput } from '../common/TextInput'

export const ExperienceStep: React.FC = () => {
  const { experiences, addExperience, nextStep, prevStep } = useFormStore()
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    employmentType: 'Full-time' as const,
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    responsibilities: '',
  })
  const [errors, setErrors] = useState<Partial<z.infer<typeof experienceSchema>>>({})
  const [overlapError, setOverlapError] = useState('')

  const handleAdd = () => {
    try {
      const validatedData = experienceSchema.parse(formData)
      const newExperiences = [...experiences, validatedData]
      if (hasOverlappingDates(newExperiences)) {
        setOverlapError('Experience dates overlap with existing entries')
        return
      }
      addExperience(validatedData)
      setErrors({})
      setOverlapError('')
      setFormData({
        jobTitle: '',
        company: '',
        employmentType: 'Full-time',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        responsibilities: '',
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message
          return acc
        }, {} as any)
        setErrors(formattedErrors)
      }
    }
  }

  const handleSubmit = () => {
    if (experiences.length === 0) {
      setErrors({ jobTitle: 'At least one experience is required' })
      return
    }
    nextStep()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Work Experience</h2>
      <div className="mb-6">
        <TextInput
          label="Job Title"
          value={formData.jobTitle}
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          error={errors.jobTitle}
        />
        <TextInput
          label="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          error={errors.company}
        />
        <Select
          label="Employment Type"
          value={formData.employmentType}
          onChange={(e) =>
            setFormData({ ...formData, employmentType: e.target.value as any })
          }
          options={[
            { value: 'Full-time', label: 'Full-time' },
            { value: 'Part-time', label: 'Part-time' },
            { value: 'Internship', label: 'Internship' },
            { value: 'Contract', label: 'Contract' },
            { value: 'Freelance', label: 'Freelance' },
          ]}
          error={errors.employmentType}
        />
        <TextInput
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          error={errors.startDate}
        />
        {!formData.currentlyWorking && (
          <TextInput
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            error={errors.endDate}
          />
        )}
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={formData.currentlyWorking}
            onChange={(e) =>
              setFormData({ ...formData, currentlyWorking: e.target.checked })
            }
            className="mr-2"
          />
          Currently Working
        </label>
        <TextInput
          label="Responsibilities"
          value={formData.responsibilities}
          onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
          error={errors.responsibilities}
        />
        {overlapError && <p className="mt-2 text-sm text-red-500">{overlapError}</p>}
        <Button onClick={handleAdd} variant="secondary" className="mt-4">
          Add Experience
        </Button>
      </div>
      {experiences.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Added Experiences</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="mt-2 rounded-md border p-4">
              <p>
                <strong>{exp.jobTitle}</strong> at {exp.company}
              </p>
              <p>{exp.employmentType}</p>
              <p>
                {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="secondary">
          Previous
        </Button>
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </motion.div>
  )
}