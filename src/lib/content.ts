import rawSite from '../content/site.json';
import rawStories from '../content/stories.json';
import rawFaq from '../content/faq.json';
import rawBanners from '../content/banners.json';
import { siteSchema, storiesSchema, faqSchema, bannersSchema } from './schemas';

export const siteData = siteSchema.parse(rawSite);
export const storiesData = storiesSchema.parse(rawStories);
export const faqData = faqSchema.parse(rawFaq);
export const bannersData = bannersSchema.parse(rawBanners);

