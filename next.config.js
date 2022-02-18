const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')

const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    locales: ['en', 'de', 'tr'],
  },
  async redirects() {
    return [
      {
        destination: '/int',
        permanent: true,
        source: '/',
      },
      {
        destination: '/int/supporter/:companySlug',
        permanent: true,
        source: '/supporter/:companySlug',
      },
      {
        destination: '/int/invite/:shareToken',
        permanent: true,
        source: '/invite/:shareToken',
      },
    ]
  },
}

const pluginAntdLess = withAntdLess({
  lessVarsFilePath: './styles/ant-default-vars.less',
  lessVarsFilePathAppendToEndOfContent: false,
  nextjs: {
    localIdentNameFollowDev: true,
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
