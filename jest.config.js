module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
      babelConfig: true,
      diagnostics: false,
    },
    // "vue-jest": {
    //   templateCompiler: {
    //     transpileOptions: {
    //       transforms: {
    //         dangerousTaggedTemplateString: true,
    //       },
    //     },
    //   },
    // },
  },
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\js$": "babel-jest",
  },
  // serializer for snapshots
  // snapshotSerializers: ["jest-serializer-vue"],
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
};
