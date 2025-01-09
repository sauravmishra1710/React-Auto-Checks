module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transpile .js and .jsx files with Babel
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|react-day-picker)/)"
  ],
  testEnvironment: 'jsdom', // Ensure the environment supports DOM APIs for React tests
};
