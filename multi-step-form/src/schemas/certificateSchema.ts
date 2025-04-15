import { z } from 'zod'

export const certificateSchema = z.object({
    name: z.string().min(1, "Certificate name is required"),
    file: z.instanceof(File).optional(), // Optional file
})

export type CertificateForm = z.infer<typeof certificateSchema>