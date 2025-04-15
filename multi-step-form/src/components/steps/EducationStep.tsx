import { useState } from 'react'
import { z } from 'zod'
import { useFormStore } from '../../state/formStore'
import { educationSchema } from '../../schemas/educationSchema'
import { Button } from '../common/Button'
import { TextInput } from '../common/TextInput'
import { motion } from 'framer-motion'

export const EducationStep: React.FC = () => {
  const { educations, addEducation, nextStep, prevStep } = useFormStore()
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    grade: '',
    certificates: [] as { name: string; file?: File }[],
  })
  const [errors, setErrors] = useState<Partial<z.infer<typeof educationSchema>>>({})

  const handleAdd = () => {
    try {
      if(formData.startYear > formData.endYear){
        setErrors({ startYear: 'It must be appropriate'})
      }
      const validatedData = educationSchema.parse(formData)
      addEducation(validatedData)
      setErrors({})
      setFormData({
        school: '',
        degree: '',
        field: '',
        startYear: '',
        endYear: '',
        grade: '',
        certificates: [],
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
    if (educations.length === 0) {
      setErrors({ school: 'At least one education entry is required' })
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
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Education</h2>
      <div className="mb-6">
        <TextInput
          label="School/University"
          value={formData.school}
          onChange={(e) => setFormData({ ...formData, school: e.target.value })}
          error={errors.school}
        />
        <TextInput
          label="Degree"
          value={formData.degree}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
          error={errors.degree}
        />
        <TextInput
          label="Field of Study"
          value={formData.field}
          onChange={(e) => setFormData({ ...formData, field: e.target.value })}
          error={errors.field}
        />
        <TextInput
          label="Start Year"
          type="number"
          value={formData.startYear}
          onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
          error={errors.startYear}
        />
        <TextInput
          label="End Year"
          type="number"
          value={formData.endYear}
          onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
          error={errors.endYear}
        />
        <TextInput
          label="Grade/GPA"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
          error={errors.grade}
        />
        <Button onClick={handleAdd} variant="secondary" className="mt-4">
          Add Education
        </Button>
      </div>
      {educations.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Added Educations</h3>
          {educations.map((edu, index) => (
            <div key={index} className="mt-2 rounded-md border p-4">
              <p>
                <strong>{edu.degree}</strong> in {edu.field}
              </p>
              <p>{edu.school}</p>
              <p>
                {edu.startYear} - {edu.endYear}
              </p>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between">
        <Button onClick={prevStep}>Previous</Button>
        <Button onClick={handleSubmit}>
          {educations.length > 0 ? 'Next' : 'Skip Education'}
        </Button>
      </div>
    </motion.div>
  )
}