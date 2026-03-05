---
title: "Migrating from React to Svelte: Lessons Learned"
description: "A comprehensive look at our team's transition, performance improvements, and the developer experience differences we encountered."
tag: "Tech"
tagClass: "tag-tech"
pubDate: "2025-04-12"
readTime: "5 min read"
---

After two years of building with React, our team decided it was time to move to Svelte. The switch wasn't easy, but the performance gains and leaner bundle sizes ultimately made it worthwhile.

## Why We Left React
React has been the backbone of our web apps, but over time, managing states, hook dependency arrays, and rendering bottlenecks became a chore. We wanted a compiler-first approach.

## Enter Svelte
Svelte compiles down to highly efficient vanilla JavaScript, so there's no virtual DOM overhead. Our initial benchmarks showed a 40% reduction in First Contentful Paint. Here’s what we learned during the process.
