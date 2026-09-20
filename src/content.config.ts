import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { tripSchema } from './lib/schemas';

const trips = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/trips' }),
  schema: tripSchema
});

export const collections = { trips };
