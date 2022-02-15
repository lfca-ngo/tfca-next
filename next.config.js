const withAntdLess = require('next-plugin-antd-less')

module.exports = withAntdLess({
  // Antd config
  lessVarsFilePath: './styles/ant-default-vars.less',
  lessVarsFilePathAppendToEndOfContent: false,
  nextjs: {
    localIdentNameFollowDev: true,
  },

  // NextJS config
  reactStrictMode: true,

  webpack: (config) => {
    config.module.rules.push({
      issuer: /\.[jt]sx?$/,
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
