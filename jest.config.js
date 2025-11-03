module.exports = {
  preset: 'ts-jest',
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", { configFile: "./babel.config.js" }],
  },
  testEnvironment: "jest-environment-jsdom", // <- agora está instalado
  // Não carregar extend-expect do testing-library nativo para evitar importar
  // módulos do react-native durante testes unitários que não precisam dele.
  // setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  moduleNameMapper: {
    // substituir o módulo Flow/TS do react-native por um stub para evitar parser errors
    "^react-native/jest/mock$": "<rootDir>/jest/react-native-jest-mock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|expo|@expo)/)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};