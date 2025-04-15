import { z } from 'zod';
import { certificateSchema } from './certificateSchema';

const currentYear = new Date().getFullYear();

export const educationSchema = z.object({
    school: z.string().min(1, "School / University name is required"),
    degree: z.string().min(1, "Degree is required"),
    field: z.string().min(1, "Field of study is required"),
    startYear: z.string()
        .min(1, "Start year is required")
        .refine(val => /^\d{4}$/.test(val), { message: "Must be a 4-digit year" })
        .refine(val => {
            const year = Number(val);
            return year >= 1900 && year <= currentYear;
        }, { message: "Must be between 1900 and current year" }),
    endYear: z.string()
        .min(1, "End year is required")
        .refine(val => /^\d{4}$/.test(val), { message: "Must be a 4-digit year" })
        .refine(val => {
            const year = Number(val);
            return year >= 1900 && year <= currentYear + 10;
        }, { message: "Must be between 1900 and a reasonable future year" }),
    grade: z.string().optional(),
    certificates: z.array(certificateSchema).optional(),
}).superRefine(({ startYear, endYear }, ctx) => {
    if (startYear && endYear && Number(endYear) < Number(startYear)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['endYear'],
            message: "End year must be after start year",
        });
    }
});

export type EducationForm = z.infer<typeof educationSchema>;