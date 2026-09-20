import rawSite from '../content/site.json';
import rawStories from '../content/stories.json';
import rawFaq from '../content/faq.json';
import { siteSchema, storiesSchema, faqSchema } from './schemas';

export const siteData = siteSchema.parse(rawSite);
export const storiesData = storiesSchema.parse(rawStories);
export const faqData = faqSchema.parse(rawFaq);
