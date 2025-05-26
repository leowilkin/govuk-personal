// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    redirects: {
        "/gh": "https://github.com/leowilkin/govuk-personal",
    }
});
