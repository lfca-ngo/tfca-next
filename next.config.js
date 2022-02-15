const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')

const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    locales: ['en', 'de', 'tr'],
  },
}

const pluginAntdLess = withAntdLess({
  lessVarsFilePath: './assets/less/ant-default-vars.less',
  lessVarsFilePathAppendToEndOfContent: false,
  nextjs: {
    localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
  },
  webpack: (config) => {
    config.module.rules.push({
      issuer: /\.[jt]sx?$/,
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
})

module.exports = withPlugins([[pluginAntdLess]], nextConfig)
