import { z } from 'zod'

export const referenceSchema = z.object({
    name: z.string().min(1, "Reference name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    company: z.string().min(1, "Company name is required"),
    contact: z.string().min(1, "Contact (phone/email) is required").refine(
      (val) =>
        /^[^@]+@[^@]+\.[^@]+$/.test(val) || /^\+?[1-9]\d{1,14}$/.test(val), // Basic email or international phone validation
      {
        message: "Enter a valid phone or email",
      }
    ),
})

export type ReferenceForm = z.infer<typeof referenceSchema>