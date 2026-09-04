import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// ─── Officers ───────────────────────────────────────────────────────────────
const officersCollection = defineCollection({
  loader: file('src/content/officers.json'),
  schema: z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    position: z.string().min(1, 'Position is required'),
    committee: z.string().optional(),
    program: z.string().min(1, 'Program is required'),
    /** Photo file path or URL — e.g. "/officers/juan-dela-cruz.webp" */
    photo: z.string().min(1, 'Photo path is required'),
    /** Order for display sorting. Lower = first. */
    order: z.number().int().nonnegative().default(99),
  }),
});

// ─── Merch ──────────────────────────────────────────────────────────────────
const merchCollection = defineCollection({
  loader: file('src/content/merch.json'),
  schema: z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Item name is required'),
    description: z.string().optional(),
    price: z.number().positive('Price must be greater than 0'),
    sizes: z.array(z.string().min(1)).min(1, 'At least one size required'),
    /** Swatch colors: label and required 6-character hex */
    colors: z.array(
      z.object({
        label: z.string().min(1),
        hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Hex color must be 6 hex characters (e.g. #8B1E1E)'),
      })
    ).min(1, 'At least one color required'),
    /** Ordered list of mockup image paths */
    images: z.array(z.string().min(1)).min(1, 'At least one image path required'),
    available: z.boolean().default(true),
  }),
});

// ─── Hall of Fame ────────────────────────────────────────────────────────────
const hallOfFameCollection = defineCollection({
  loader: file('src/content/hall-of-fame.json'),
  schema: z.object({
    id: z.string().optional(),
    year: z.number().int().min(2000).max(2100),
    /** Semester is applicable for Dean's Listers; optional for Board Exam Topnotchers */
    semester: z.enum(['1st', '2nd']).optional(),
    name: z.string().min(1, 'Name is required'),
    program: z.string().min(1, 'Program is required'),
    category: z.enum(["Dean's Lister", 'Topnotcher']),
    /** For Topnotcher: board exam rank (e.g., 1, 3). For Dean's Lister: omitted. */
    rank: z.number().int().positive().optional(),
  }),
});

// ─── Accomplishments ─────────────────────────────────────────────────────────
const accomplishmentsCollection = defineCollection({
  loader: file('src/content/accomplishments.json'),
  schema: z.object({
    id: z.string().optional(),
    eventName: z.string().min(1, 'Event name is required'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use ISO date: YYYY-MM-DD'),
    projectHead: z.string().min(1, 'Project head is required'),
    sponsors: z.array(z.string()).default([]),
    summary: z.string().min(1, 'Summary is required').max(400, 'Keep summary under 400 characters'),
  }),
});

export const collections = {
  officers: officersCollection,
  merch: merchCollection,
  'hall-of-fame': hallOfFameCollection,
  accomplishments: accomplishmentsCollection,
};
