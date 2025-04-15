import { useState } from 'react'
import { z } from 'zod'
import { useFormStore } from '../../state/formStore'
import { personalInfoSchema } from '../../schemas/personalInfoSchema'
import { Button } from '../common/Button'
import { Select } from '../common/Select'
import { TextInput } from '../common/TextInput'
import { calculateAge } from '../../utils/calculateAge'
import { motion } from 'framer-motion'

export const PersonalInfoStep: React.FC = () => {
  const { personalInfo, setPersonalInfo, nextStep } = useFormStore()
  const [errors, setErrors] = useState<Partial<z.infer<typeof personalInfoSchema>>>({})

  const handleSubmit = () => {
    try {
      personalInfoSchema.parse(personalInfo)
      setErrors({})
      nextStep()
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

  const handleChange = (field: keyof typeof personalInfo, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Personal Information</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <TextInput
          label="Full Name"
          value={personalInfo.fullName}
          placeholder='John Doe'
          onChange={(e: any) => handleChange('fullName', e.target.value)}
          error={errors.fullName}
        />
        <TextInput
          label="Email"
          type="email"
          value={personalInfo.email}
          placeholder='john@gmail.com'
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />
        <TextInput
          label="Phone Number"
          value={personalInfo.phone}
          placeholder='+919820202034'
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
        />
        <TextInput
          label="Date of Birth"
          type="date"
          value={personalInfo.dob || ''}
          onChange={(e) => handleChange('dob', e.target.value)}
        />
        {personalInfo.dob && (
          <p className="text-sm text-gray-600">Age: {calculateAge(personalInfo.dob)}</p>
        )}
        <Select
          label="Gender"
          value={personalInfo.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' },
            { value: 'Prefer not to say', label: 'Prefer not to say' },
          ]}
          error={errors.gender}
        />
        <TextInput
          label="Current Location"
          value={personalInfo.location}
          onChange={(e) => handleChange('location', e.target.value)}
          error={errors.location}
        />
        <Select
          label="Education Level"
          value={personalInfo.educationLevel || ''}
          onChange={(e) => handleChange('educationLevel', e.target.value)}
          options={[
            { value: 'High School', label: 'High School' },
            { value: 'Undergraduate', label: 'Undergraduate' },
            { value: 'Graduate or higher', label: 'Graduate or higher' },
          ]}
          error={errors.educationLevel}
        />
        <div className="mt-6 flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </motion.div>
  )
}