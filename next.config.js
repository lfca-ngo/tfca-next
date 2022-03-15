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
    locales: ['de', 'en', 'es', 'fr', 'tr'],
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
