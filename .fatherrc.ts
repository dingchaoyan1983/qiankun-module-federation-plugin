import { defineConfig } from 'father';

export default defineConfig({
  esm: {},
  cjs: {
    output: "dist/lib"
  },
  platform: "node"
});
