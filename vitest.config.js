"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        environment: 'node',
        clearMocks: true,
        coverage: {
            enabled: true,
            all: true,
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
