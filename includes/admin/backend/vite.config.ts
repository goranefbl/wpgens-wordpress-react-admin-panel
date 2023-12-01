import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `[name].js`, // No need for hash, you have plugin version to deal with caching.
				chunkFileNames: `[name].js`, // No need for hash, you have plugin version to deal with caching.
				assetFileNames: `[name].[ext]`, // No need for hash, you have plugin version to deal with caching.
				dir: `../assets/js`, // This is assets folder one directory below backend folder.
				manualChunks: undefined, // We want single JS file. By default its split into index and vendor.
				format: 'iife', // We need iife or else globals will clash with WordPress global variables!
			},
		},
	},
	server: {
		port: 5178, // Port running our app, its hardcoded under the class-wp-react-admin-panel-assets.php
	},
});
