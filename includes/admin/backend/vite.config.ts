import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
				dir: `../assets/js`,
				manualChunks: undefined,
				format: "iife", // We need iife or else globals will clash with WordPress global variables.
			},
		},
	},
	server: {
		port: 5178,
	},
});
