import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'f16xph',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
