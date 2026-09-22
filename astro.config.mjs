import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://himaltrails.example',
  compressHTML: true,
  image: {
    domains: ['images.unsplash.com']
  },
  build: {
    format: 'directory'
  },
  redirects: {
    '/admin': '/admin/index.html'
  }
});
