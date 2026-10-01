import { z } from 'zod';

export const createLinkSchema = z.object({
  url: z.string().url({ message: 'Must be a valid URL starting with http:// or https://' }),
  title: z.string().trim().max(100).optional().or(z.literal('')),
  customCode: z
    .string()
    .trim()
    .min(3, 'Custom code must be at least 3 characters')
    .max(20, 'Custom code cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Custom code can only contain letters, numbers, hyphens, and underscores')
    .optional()
    .or(z.literal(''))
});
