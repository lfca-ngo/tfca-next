const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')

const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    locales: ['en', 'de', 'tr'],
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  async redirects() {
    /**
     * TODO:
     * - change default actionCollection from `new` to `int` once content is ready
     * - change permanent redirect from `false` to `true`
     */
    return [
      {
        destination: '/new',
        permanent: false,
        source: '/',
      },
      {
        destination: '/new/supporter/:companySlug',
        permanent: false,
        source: '/supporter/:companySlug',
      },
      {
        destination: '/new/invite/:shareToken',
        permanent: false,
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
