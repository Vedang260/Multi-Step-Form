import { useState } from 'react'
import { useFormStore } from '../../state/formState'
import { personalInfoSchema } from '../../schemas/personalInfoSchema'
import { experienceSchema } from '../../schemas/experienceSchema'
import { educationSchema } from '../../schemas/educationSchema'
import { referenceSchema } from '../../schemas/referenceSchema'
import { Button } from '../common/Button'
import { motion } from 'framer-motion'

export const SubmitStep: React.FC = () => {
  const {
    personalInfo,
    experiences,
    educations,
    references,
    skipReferences,
    prevStep,
  } = useFormStore()
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState(false)

  const validateAll = () => {
    const validationErrors: string[] = []

    try {
      personalInfoSchema.parse(personalInfo)
    } catch (error) {
      validationErrors.push('Personal Information is incomplete or invalid')
    }

    if (experiences.length === 0) {
      validationErrors.push('At least one experience is required')
    } else {
      experiences.forEach((exp, index) => {
        try {
          experienceSchema.parse(exp)
        } catch {
          validationErrors.push(`Experience entry ${index + 1} is invalid`)
        }
      })
    }

    if (personalInfo.educationLevel === 'Graduate or higher' && educations.length === 0) {
      validationErrors.push('At least one education entry is required')
    } else {
      educations.forEach((edu, index) => {
        try {
          educationSchema.parse(edu)
        } catch {
          validationErrors.push(`Education entry ${index + 1} is invalid`)
        }
      })
    }

    if (!skipReferences && references.length === 0) {
      validationErrors.push('At least one reference is required unless skipped')
    } else if (!skipReferences) {
      references.forEach((ref, index) => {
        try {
          referenceSchema.parse(ref)
        } catch {
          validationErrors.push(`Reference entry ${index + 1} is invalid`)
        }
      })
    }

    return validationErrors
  }

  const handleSubmit = () => {
    const validationErrors = validateAll()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    if (!termsAgreed) {
      setErrors(['You must agree to the terms and conditions'])
      return
    }
    setErrors([])
    setSuccess(true)
    // TODO: Implement PDF generation or backend submission
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Submit</h2>
      {success ? (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-600">Submission Successful!</h3>
          <p className="mt-2">Thank you for completing the form.</p>
          {/* TODO: Add PDF download button */}
        </div>
      ) : (
        <div>
          {errors.length > 0 && (
            <div className="mb-4 rounded-md bg-red-100 p-4">
              <h3 className="text-sm font-semibold text-red-800">Errors:</h3>
              <ul className="list-disc pl-5 text-sm text-red-700">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="mr-2"
            />
            I agree to the Terms and Conditions
          </label>
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="secondary">
              Previous
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}