export default {
    testEnvironment: 'node',
    roots: ['<rootDir>/testing'],
    testMatch: ['**/*.test.js'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    forceExit: true,
    detectOpenHandles: true
};