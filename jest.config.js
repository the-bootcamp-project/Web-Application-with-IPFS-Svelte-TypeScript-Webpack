'use strict';

const JestConfig = require('@bootcamp-project/jest-config/jest.svelte.config')
module.exports = {
    ...JestConfig,
    coverageReporters: ['html','text'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
}
