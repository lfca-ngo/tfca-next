import MdBsById from '../../assets/data/mdbs-by-id.json'
import MEPBadgesById from '../../assets/data/mep-badges-by-id.json'
import MEPCountries from '../../assets/data/mep-countries.json'
import MEPsById from '../../assets/data/meps-by-id.json'

const DEFAULT_COUNTRY_CODE = 'DE'

const allMEPs = Object.keys(MEPsById).reduce((acc, id) => {
  const MEP = MEPsById[id]

  acc.push(MEP)

  return acc
}, [])

const allMdBs = Object.keys(MdBsById).reduce((acc, id) => {
  const MdB = MdBsById[id]

  acc.push(MdB)

  return acc
}, [])

const allAvailableCountryCodes = MEPCountries.map((c) => c.countryCode)

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

    // Only allow zip filterif country === 'DE'
    const zipFilter =
      (countriesFilter.includes('DE') && req.query['filter.zip']) || undefined

    const filteredMEPs = allMEPs
      .filter((mep) => {
        const hasMatchingBadge = !badgesFilter.length
          ? true
          : mep.badges.filter((mepBadge) => badgesFilter.includes(mepBadge))
              .length > 0

        return countriesFilter.includes(mep.countryCode) && hasMatchingBadge
      })
      .sort((mepA, mepB) => {
        // We sort the MEPs based on the badges we provide.
        // MEPs who have the first provided badge will appear before someone who only has the second provided badge.
        const firstMatchingBadgeIndexMepA = badgesFilter.findIndex((badgeId) =>
          mepA.badges.includes(badgeId)
        )
        const fistMatchingBadgeIndexMepB = badgesFilter.findIndex((badgeId) =>
          mepB.badges.includes(badgeId)
        )

        if (firstMatchingBadgeIndexMepA < fistMatchingBadgeIndexMepB) return -1
        if (firstMatchingBadgeIndexMepA > fistMatchingBadgeIndexMepB) return 1

        // Both MEPs seem to have the same "lowest" badge index match.
        // Let's in that case we sort based on the position the badge appears in the MEPs array.
        const mostRelevantBadgeId = badgesFilter[firstMatchingBadgeIndexMepA]

        const indexForMepA = mepA.badges.indexOf(mostRelevantBadgeId)
        const indexForMepB = mepB.badges.indexOf(mostRelevantBadgeId)

        if (indexForMepA < indexForMepB) return -1
        if (indexForMepA > indexForMepB) return 1

        return 0
      })

    const filteredMdBs =
      (zipFilter &&
        allMdBs.filter((mdb) =>
          mdb.constituencyZipCodes.includes(zipFilter)
        )) ||
      []

    // Filter the list of MEPs
    res.status(200).json({
      // Only return the props that we need
      items: filteredMdBs
        .concat(filteredMEPs)
        .slice(0, 5)
        .map((item) => ({
          email: item.email,
          facebook: item.facebook,
          fullName: item.fullName,
          imageUrl: item.imageUrl,
          instagram: item.instagram,
          linkedIn: item.linkedIn,
          nationalPoliticalGroup: item.nationalPoliticalGroup,
          parliament: item.badges ? 'EU' : 'DE',
          twitter: item.twitter,
        })),
    })
  } catch (e) {
    throw new Error(e.message || e)
  }
}
