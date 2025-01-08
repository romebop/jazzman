import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://romebop.github.io',
  base: '/jazzman',
  integrations: [react()],
});