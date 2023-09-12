import { defineConfig } from "cypress";

export default defineConfig({
  port: 9018,

  component: {
    devServer: {
      bundler: "vite",
      framework: "react",
    },
  },

  e2e: {},
});
