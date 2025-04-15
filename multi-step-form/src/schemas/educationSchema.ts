import { z } from 'zod';
import { certificateSchema } from './certificateSchema';

export const educationSchema = z.object({
    school: z
        .string()
        .min(1, "School / University name is required"),
    degree: z
        .string()
        .min(1, "Degree is required"),
    field: z
        .string()
        .min(1, "Field of study is required"),
    startYear: z
        .string()
        .regex(/^\d{4}$/, " Start year must be 4 digits"),
    endYear: z
        .string()
        .regex(/^\d{4}$/, "End year must be 4 digits"),
    grade: z
        .string()
        .optional(),
    certificates: z
        .array(certificateSchema)
        .optional(),
})

export type EducationForm = z.infer<typeof educationSchema>;