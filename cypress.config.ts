import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportWidth: 1400,
    viewportHeight: 900,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {},
    supportFile: false,
    // supportFile: 'cypress/support/e2e.ts',
  },
});
