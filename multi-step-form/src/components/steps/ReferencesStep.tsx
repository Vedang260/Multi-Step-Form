import { useState } from 'react'
import { z } from 'zod'
import { useFormStore } from '../../state/formStore'
import { referenceSchema } from '../../schemas/referenceSchema'
import { Button } from '../common/Button'
import { TextInput } from '../common/TextInput'
import { motion } from 'framer-motion'

export const ReferencesStep: React.FC = () => {
  const { references, addReference, skipReferences, setSkipReferences, nextStep, prevStep } = useFormStore()
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    company: '',
    contact: '',
  })
  const [errors, setErrors] = useState<Partial<z.infer<typeof referenceSchema>>>({})

  const handleAdd = () => {
    try {
      const validatedData = referenceSchema.parse(formData)
      addReference(validatedData)
      setErrors({})
      setFormData({ name: '', relationship: '', company: '', contact: '' })
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
    if (!skipReferences && references.length === 0) {
      setErrors({ name: 'At least one reference is required unless skipped' })
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
      <h2 className="mb-6 text-2xl font-bold text-gray-800">References</h2>
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={skipReferences}
          onChange={(e) => setSkipReferences(e.target.checked)}
          className="mr-2"
        />
        Skip adding references
      </label>
      {!skipReferences && (
        <div className="mb-6">
          <TextInput
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />
          <TextInput
            label="Relationship"
            value={formData.relationship}
            onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
            error={errors.relationship}
          />
          <TextInput
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            error={errors.company}
          />
          <TextInput
            label="Contact (Phone/Email)"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            error={errors.contact}
          />
          <Button onClick={handleAdd} variant="secondary" className="mt-4">
            Add Reference
          </Button>
        </div>
      )}
      {references.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Added References</h3>
          {references.map((ref, index) => (
            <div key={index} className="mt-2 rounded-md border p-4">
              <p>
                <strong>{ref.name}</strong>, {ref.relationship}
              </p>
              <p>{ref.company}</p>
              <p>{ref.contact}</p>
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