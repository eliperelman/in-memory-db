const lint = require('@mozilla-frontend-infra/node-lint');
const node = require('@neutrinojs/node');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    lint({
      rules: {
        'max-classes-per-file': 'off',
      },
    }),
    node({
      targets: {
        node: '12.0',
      },
      babel: {
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    }),
  ],
};
