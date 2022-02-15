// import { Link } from 'gatsby'
// import React from 'react'
// import { Link as ScrollLink } from 'react-scroll'

// import { getPrefixByLangAndRegion } from '../../../utils'
// import useIntl from '../../../utils/useIntl'

// const CustomLink = ({ children, slug, url }) => {
//   const { activeLanguage, activeRegion } = useIntl()
//   const urlPrefix = getPrefixByLangAndRegion(
//     activeLanguage.isoCode,
//     activeRegion.isoCode,
//     activeRegion.languages
//   )

//   const isInternal = slug && slug.length > 0

//   // if the slug links to an element on this page
//   const isOnPage = slug && slug.indexOf('#') === 0
//   if (isOnPage) {
//     const element = slug.substring(1)
//     return (
//       <ScrollLink smooth to={element}>
//         {children}
//       </ScrollLink>
//     )
//   }

//   let customSlug = slug
//   if (slug === '/') {
//     customSlug = ''
//   }

//   const urlFirstPart = !urlPrefix ? '' : `/${urlPrefix}`
//   const linkTo = `${urlFirstPart}/${customSlug}`

//   if (isInternal) {
//     return (
//       <Link activeClassName="active" partiallyActive to={linkTo}>
//         {children}
//       </Link>
//     )
//   } else return <a href={url}>{children}</a>
// }

// export default CustomLink
