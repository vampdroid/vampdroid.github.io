// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import lottie from "astro-integration-lottie";

export default defineConfig({
    site: 'https://yashkukreja.com',
    integrations: [mdx(), sitemap(), react(), lottie(),],
});
