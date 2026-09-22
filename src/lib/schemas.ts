import { z } from 'astro/zod';

export const tripSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Trip title is required'),
  destination: z.string().min(1, 'Destination is required'),
  nights: z.number().int().positive('Nights must be a positive integer'),
  pricePerPerson: z.number().positive('Price per person must be positive'),
  highestPointMetres: z.number().nonnegative('Highest point must be non-negative'),
  tag: z.string().optional().default(''),
  featured: z.boolean().optional().default(false),
  highlights: z.array(z.string()).min(1, 'At least 1 highlight required'),
  days: z.array(
    z.object({
      label: z.string(),
      title: z.string(),
      text: z.string()
    })
  ).min(1, 'At least one day itinerary is required'),
  included: z.array(z.string()).min(1, 'At least 1 inclusion is required'),
  photo: z.string().optional(),
  plate: z.object({
    seed: z.number(),
    px: z.number().default(0.5),
    py: z.number().default(0.5),
    bg: z.tuple([z.string(), z.string()])
  })
});

export const siteSchema = z.object({
  brand: z.string(),
  whatsapp: z.string(),
  phone: z.string(),
  email: z.string().email(),
  hours: z.string(),
  hero: z.object({
    headline: z.string(),
    lead: z.string(),
    peak: z.object({
      name: z.string(),
      metres: z.number()
    })
  }),
  finePrint: z.string()
});

export const storiesSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  items: z.array(
    z.object({
      quote: z.string(),
      author: z.string(),
      trip: z.string(),
      location: z.string()
    })
  )
});

export const faqSchema = z.object({
  heading: z.string(),
  items: z.array(
    z.object({
      question: z.string(),
      answer: z.string()
    })
  )
});

export const bannerSchema = z.object({
  id: z.string().min(1, 'Banner ID is required'),
  tripId: z.string().min(1, 'Trip ID is required'),
  badge: z.string().min(1, 'Badge text is required'),
  badgeType: z.enum(['trending', 'new', 'popular', 'limited']),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  perks: z.array(z.string()).min(1, 'At least 1 perk is required'),
  price: z.string().min(1, 'Price is required'),
  mrp: z.string().min(1, 'MRP is required'),
  image: z.string().min(1, 'Image path or URL is required'),
  alt: z.string().min(1, 'Alt text is required')
});

export const bannersSchema = z.object({
  banners: z.array(bannerSchema).min(1, 'At least 1 banner is required')
});

export type Banner = z.infer<typeof bannerSchema>;
export type Banners = z.infer<typeof bannersSchema>;

