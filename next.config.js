const withAntdLess = require('next-plugin-antd-less')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')

const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    localeDetection: true,
    // IMPORTANT: This must! match all possible isoCodes in the `languagesCollection` in contentful!!!
    locales: ['de', 'en', 'es', 'fr', 'tr'],
  },
  images: {
    domains: [
      'backend.wirklich-gruen.de',
      'images.ctfassets.net',
      'localhost',
      'res.cloudinary.com',
      'tfca-next.vercel.app',
      'www.bundestag.de',
      'www.europarl.europa.eu',
      'backend.wirklich-gruen.de',
      'res.cloudinary.com',
      'tfca.earth',
      'www.tfca.earth',
    ],
  },
  async redirects() {
    /**
     * TODO:
     * - change permanent redirect from `false` to `true`
     */
    return [
      // Redirects for root
      {
        destination: '/de/deu',
        locale: false,
        permanent: false,
        source: '/de',
      },
      {
        destination: '/gbr',
        locale: false,
        permanent: false,
        source: '/en-GB',
      },
      {
        destination: '/int', // TODO: Redirct to US collection once it is configured
        locale: false,
        permanent: false,
        source: '/en-US',
      },
      {
        destination: '/int',
        locale: false,
        permanent: false,
        source: '/en',
      },
      {
        destination: '/es/esp',
        locale: false,
        permanent: false,
        source: '/es',
      },
      {
        destination: '/fr/fra',
        locale: false,
        permanent: false,
        source: '/fr',
      },
      {
        destination: '/tr/tur',
        locale: false,
        permanent: false,
        source: '/tr',
      },
      // Redirects for company & intite pages that fo not provide any region
      {
        destination: '/int/co/:companySlug',
        permanent: false,
        source: '/co/:companySlug',
      },
      {
        destination: '/int/invite/:shareToken',
        permanent: false,
        source: '/invite/:shareToken',
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      issuer: /\.[jt]sx?$/,
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [
      withAntdLess,
      {
        lessVarsFilePath: './styles/variables.less',
      },
    ],
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
        },
      },
    ],
  ],
  nextConfig
)
