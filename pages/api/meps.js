import MEPBadgesById from '../../assets/data/mep-badges-by-id.json'
import MEPCountries from '../../assets/data/mep-countries.json'
import MEPsById from '../../assets/data/meps-by-id.json'

const DEFAULT_LOCALE = 'EN'
const DEFAULT_COUNTRY_CODE = 'DE'

const allMEPs = Object.keys(MEPsById).reduce((acc, id) => {
  const MEP = MEPsById[id]

  acc.push(MEP)

  return acc
}, [])

const allAvailableCountryCodes = MEPCountries.map((c) => c.countryCode)

const availableLocales = Object.keys(
  MEPBadgesById[Object.keys(MEPBadgesById)[0]]
)

const availableBadges = Object.keys(MEPBadgesById)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  try {
    const countriesFilter = (req.query['filter.countries']?.toUpperCase() || '')
      .split(',')
      // Only keep valid countryCodes in filter
      .filter((code) => allAvailableCountryCodes.includes(code))
    // Use default countryCode if no valid filter is set
    if (!countriesFilter.length) {
      countriesFilter.push(DEFAULT_COUNTRY_CODE)
    }

    const badgesFilter = (req.query['filter.badges'] || '')
      .split(',')
      // Only keep valid badges in filter
      .filter((badge) => availableBadges.includes(badge))

    const locale =
      req.query.locale &&
      availableLocales.includes(req.query.locale.toUpperCase())
        ? req.query.locale.toUpperCase()
        : DEFAULT_LOCALE

    // Filter the list of MEPs
    res.status(200).json({
      appliedFilters: {
        badges: badgesFilter,
        countries: countriesFilter,
      },
      items: allMEPs.filter((mep) => {
        const hasMatchingBadge = !badgesFilter.length
          ? true
          : mep.badges.filter((mepBadge) => badgesFilter.includes(mepBadge))
              .length > 0

        return countriesFilter.includes(mep.countryCode) && hasMatchingBadge
      }),
    })
  } catch (e) {
    throw new Error(e.message || e)
  }
}
