module.exports = {
  $schema: 'http://json.schemastore.org/prettierrc',
  semi: false,
  singleQuote: true,
  printWidth: 80,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  bracketSameLine: false,
  plugins: ['./node_modules/prettier-plugin-organize-imports'],
  overrides: [
    {
      files: '*.yaml',
      options: {
        bracketSpacing: false,
      },
    },
  ],
}
