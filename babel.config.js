module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@src': './src',
        '@auth': './src/modules/auth',
        '@domain_admin': './src/modules/domain/admin',
      }
    }],
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
  ],
  ignore: [
    './test',
    '**/*.spec.ts',
    '**/*.test.ts'
  ]
}