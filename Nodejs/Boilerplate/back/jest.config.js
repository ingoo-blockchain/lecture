module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    clearMocks: true,
    testPathIgnorePatterns: ['/node_modules/', '__integration__'],
    // collectCoverage: true,
    verbose: true,
    roots: ['<rootDir>'],
    testMatch: ['<rootDir>/src/**/*.test.js', '<rootDir>/lib/*.test.js'],
}
