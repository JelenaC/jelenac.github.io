import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '4nuwsv',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-localstorage-commands/plugin")(on, config)
      return config
    },
    baseUrl: 'http://localhost:3000/#',
  },
});
