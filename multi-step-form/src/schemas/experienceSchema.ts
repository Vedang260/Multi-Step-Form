import { z } from 'zod';

export const experienceSchema = z.object({
    jobTitle: z
        .string()
        .min(1, 'Job title is required'),
    company: z
        .string()
        .min(1, 'Company is required'),
    employmentType: z
        .enum(['Full-Time' , 'Part-Time' , 'Internship' , 'Contract' , 'Freelance']),
    startDate: z
        .string()
        .min(1, 'Start Date is required'),
    endDate: z
        .string()
        .optional(),
    currentlyWorking: z.boolean(),
    responsibilities: z
        .string()
        .min(1, 'Responsibilities are required'),
}).refine(
    (data) => data.currentlyWorking || !!data.endDate,
    { message: 'End date is required unless currently working', path: ['endDate']}
)

export type ExperienceForm = z.infer<typeof experienceSchema>