export default {
  testEnvironment: "node",
  testMatch: ["**/__test__/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  globals: {
    documentNumbers: 100000,
    queryDocumentNumbers: 10000,
    queryDocumentRatio: 1
  }
};
