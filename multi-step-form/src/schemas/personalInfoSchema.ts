import { z } from 'zod';

export const personalInfoSchema = z.object({
    fullName: z
        .string()
        .min(1, 'Full name is required')
        .regex(/^[a-zA-Z\s]+$/, 'Only letters & Spaces are Allowed'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^\+?[1-9]\d{1, 14}$/, 'Invalid phone number'),
    location: z
        .string()
        .min(1, 'Location is required'),
    educationLevel: z
        .enum(['High School', 'Undergraduate', 'Graduate or higher'])
        .optional(),
})

export type PersonalInfoForm = z.infer<typeof personalInfoSchema>