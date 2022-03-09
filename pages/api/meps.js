import MEPBadgesById from '../../assets/data/mep-badges-by-id.json'
import MEPsById from '../../assets/data/meps-by-id.json'

const DEFAULT_LOCALE = 'EN'
const DEFAULT_COUNTRY_CODE = 'DE'

const { allMEPs, availableCountryCodes } = Object.keys(MEPsById).reduce(
  (acc, id) => {
    const MEP = MEPsById[id]

    acc.allMEPs.push(MEP)

    if (!acc.availableCountryCodes.includes(MEP.countryCode)) {
      acc.availableCountryCodes.push(MEP.countryCode)
    }

    return acc
  },
  {
    allMEPs: [],
    availableCountryCodes: [],
  }
)

const availableLocales = Object.keys(
  MEPBadgesById[Object.keys(MEPBadgesById)[0]]
)

const availableBadges = Object.keys(MEPBadgesById)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  try {
    const countryCodesFilter = (req.query['filter.countryCodes'] || '')
      .split(',')
      // Only keep valid countryCodes in filter
      .filter((code) => availableCountryCodes.includes(code))
    // Use default countryCode if no valid filter is set
    if (!countryCodesFilter.length) {
      countryCodesFilter.push(DEFAULT_COUNTRY_CODE)
    }

    const badgesFilter = (req.query['filter.badges'] || '')
      .split(',')
      // Only keep valid badges in filter
      .filter((badge) => availableBadges.includes(badge))

    const locale = availableLocales.includes(req.query.locale)
      ? req.query.locale
      : DEFAULT_LOCALE

    // Filter the list of MEPs
    res.status(200).json({
      appliedFilters: {
        badges: badgesFilter,
        countryCode: countryCodesFilter,
      },
      availableFilters: {
        badges: Object.keys(MEPBadgesById).map((badgeId) => ({
          id: badgeId,
          name: MEPBadgesById[badgeId][locale],
        })),
        countryCodes: availableCountryCodes,
      },
      items: allMEPs.filter((mep) => {
        const hasMatchingBadge = !badgesFilter.length
          ? true
          : mep.badges.filter((mepBadge) => badgesFilter.includes(mepBadge))
              .length > 0

        return countryCodesFilter.includes(mep.countryCode) && hasMatchingBadge
      }),
    })
  } catch (e) {
    throw new Error(e.message || e)
  }
}
