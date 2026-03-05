// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
    site: 'https://yashkukreja.com',
    prefetch: true,
    integrations: [mdx(), sitemap(), react()],
});
