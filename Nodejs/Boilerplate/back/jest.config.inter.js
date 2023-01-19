module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    clearMocks: true,
    testPathIgnorePatterns: ['/node_modules/'],
    // collectCoverage: true,
    verbose: true,
    roots: ['<rootDir>'],
    testMatch: ['<rootDir>/__integration__/*.test.js'],
}
