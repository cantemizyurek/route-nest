import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Route Nest',
      social: {
        github: 'https://github.com/cantemizyurek/route-nest',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', link: '/guides/example/' },
          ],
        },
        {
          label: 'API',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
})
