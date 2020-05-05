module.exports = {
  moduleFileExtensions: ['js', 'json'],
  rootDir: '__tests__',
  testRegex: ['.spec.js$', '.test.js$'],
  coverageDirectory: './coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['../setupTests.js'],
  testPathIgnorePatterns: ['../node_modules/']
};
