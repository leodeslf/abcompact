import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 660,
  viewportWidth: 1000,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    }
  },
});
