import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	server: {
		port: 3009
	},
	plugins: [react()],
	build: {
		outDir: 'build',
		rollupOptions: {
			output: {
				manualChunks: {
					'mantine': ['@mantine/core', '@mantine/hooks', '@mantine/form', '@mantine/notifications'],
					'react-vendor': ['react', 'react-dom', 'react-router-dom']
				}
			}
		}
	},
	optimizeDeps: {
		include: [
			'@mantine/core',
			'@mantine/hooks',
			'@mantine/form',
			'@mantine/notifications',
			'@tabler/icons-react',
			'@emotion/react'
		]
	}
});
