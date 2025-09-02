import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['src/**/*.test.ts'],
		environment: 'node',
		deps: {
			inline: [/@mikecbrant\/appsyncjs-.*/, '@aws-appsync/utils'],
		},
		clearMocks: true,
		coverage: {
			enabled: true,
			all: true,
			include: ['src/**/*.ts'],
			exclude: ['sst.config.ts'],
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'text-summary'],
			reportsDirectory: './coverage',
			thresholds: {
				branches: 100,
				functions: 100,
				lines: 100,
				statements: 100,
			},
		},
	},
});
