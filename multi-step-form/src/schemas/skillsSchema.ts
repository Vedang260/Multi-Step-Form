import { z } from 'zod';

export const skillsSchema = z.object({
    name: z
        .string()
        .min(1, "Skill name is required"),
    years: z
        .number()
        .int()
        .nonnegative()
        .max(50)
        .optional(),
})

export type SkillsForm = z.infer<typeof skillsSchema>