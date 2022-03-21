const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    // IMPORTANT: This must! match all possible isoCodes in the `languagesCollection` in contentful!!!
    // TODO: fetch contentful languages dynamically
    locales: ['de', 'en', 'en-US'],
  },
  images: {
    domains: [
      'images.ctfassets.net',
      'www.bundestag.de',
      'www.europarl.europa.eu',
    ],
  },
  async redirects() {
    /**
     * TODO:
     * - change permanent redirect from `false` to `true`
     */
    return [
      {
        destination: '/int',
        permanent: false,
        source: '/',
      },
      {
        destination: '/int/supporter/:companySlug',
        permanent: false,
        source: '/supporter/:companySlug',
      },
      {
        destination: '/int/invite/:shareToken',
        permanent: false,
        source: '/invite/:shareToken',
      },
    ]
  },
}

const pluginAntdLess = withAntdLess({
  lessVarsFilePath: './styles/variables.less',
  // lessVarsFilePathAppendToEndOfContent: false,
  // nextjs: {
  //   localIdentNameFollowDev: true,
  // },
  webpack: (config) => {
    config.module.rules.push({
      issuer: /\.[jt]sx?$/,
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
})

module.exports = withPlugins(
  [[pluginAntdLess], [withBundleAnalyzer]],
  nextConfig
)
