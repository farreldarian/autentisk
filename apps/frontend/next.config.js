const withTm = require('next-transpile-modules')(['contract'])

module.exports = withTm({
  reactStrictMode: true,
})
