const globals = {
  globals: {
    afterAll: false,
    afterEach: false,
    beforeAll: false,
    beforeEach: false,
    describe: false,
    expect: false,
    fit: false,
    it: false,
    jasmine: false,
    jest: false,
    pending: false,
    pit: false,
    require: false,
    test: false,
    xdescribe: false,
    xit: false,
    xtest: false,
  }
}

module.exports = {
  root: true,
  env: {
    'jest/globals': true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  plugins: ['jest','eslint-plugin'],
  rules: {
    'new-cap': 'off',
    'no-useless-constructor': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    'createjs': true
  },
  overrides: [
    {
      files: ['*.test.js'],
      globals,
    },
  ]
}
