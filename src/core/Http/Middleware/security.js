import { z } from 'zod';

/**
 * NoSQL Injection Sanitizer
 * Strips $ and {} operators from user input
 */
export function sanitizeNoSQL(input) {
  if (typeof input === 'string') {
    return input.replace(/\$/g, '').replace(/\{/g, '').replace(/\}/g, '');
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized = Array.isArray(input) ? [] : {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const cleanKey = key.replace(/\$/g, '');
        sanitized[cleanKey] = sanitizeNoSQL(input[key]);
      }
    }
    return sanitized;
  }
  return input;
}

/**
 * Zod Schemas
 */
export const appointmentBookingSchema = z.object({
  patientName: z.string().min(2, 'Patient name required'),
  patientAge: z.union([z.string(), z.number()]),
  patientPhone: z.string().min(10, 'Valid 10-digit phone number required'),
  patientEmail: z.string().email().optional().or(z.literal('')),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).default('MALE'),
  doctorId: z.string().optional(),
  appointmentDate: z.string(),
  timeSlot: z.string().default('10:00 AM - 12:00 PM'),
  reasonForVisit: z.string().optional().default(''),
});

export const opticalFrameSchema = z.object({
  name: z.string().min(2, 'Frame name required'),
  brand: z.string().default(''),
  category: z.string().default('FRAMES'),
  lensType: z.string().default(''),
  frameShape: z.string().default(''),
  material: z.string().default(''),
  priceRange: z.string().default(''),
  description: z.string().optional().default(''),
  imageUrl: z.string().default(''),
  isTrending: z.boolean().default(true),
});
