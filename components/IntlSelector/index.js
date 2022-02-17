// require('./styles.less')

// import { Form, Popover, Select } from 'antd'
// import { navigate } from 'gatsby'
// import React from 'react'

// import { getPrefixByLangAndRegion, isBrowser } from '../../utils'
// import { useIsMobile } from '../../utils/IsMobileProvider'
// import { defaultLangKey, defaultRegionKey } from '../../utils/siteConfig'
// import useIntl from '../../utils/useIntl'

// const isDefaultLangAndRegion = (activeLanguage, activeRegion) => {
//   if (
//     activeRegion.isoCode === defaultRegionKey &&
//     activeLanguage.isoCode === defaultLangKey
//   ) {
//     return true
//   } else return false
// }

// const IntlSelector = (props) => {
//   const { activeLanguage, activeRegion, regions } = useIntl()
//   const { isMobile } = useIsMobile()

//   const goToPage = (prefix) => {
//     const pathArray = isBrowser() ? window.location.pathname.split('/') : []
//     const isRoot = isDefaultLangAndRegion(activeLanguage, activeRegion)
//     const companySubpage = isRoot ? pathArray[1] : pathArray[2]
//     const companyLink = companySubpage ? `/${companySubpage}` : ''

//     if (prefix === '' && companyLink) navigate(`${prefix}${companyLink}`)
//     else navigate(`/${prefix}${companyLink}`)
//   }

//   const handleRegionChange = (regionCode) => {
//     const newRegion = regions.find((region) => region.isoCode === regionCode)
//     const prefix = getPrefixByLangAndRegion(
//       newRegion.defaultLanguage.isoCode,
//       newRegion.isoCode,
//       newRegion.languages
//     )
//     goToPage(prefix)
//   }

//   const handleLangChange = (langCode) => {
//     const prefix = getPrefixByLangAndRegion(
//       langCode,
//       activeRegion.isoCode,
//       activeRegion.languages
//     )
//     goToPage(prefix)
//   }

//   return (
//     <div className="intl-selector">
//       <Popover
//         content={
//           <div>
//             <Form layout="vertical">
//               <Form.Item label="Region">
//                 <Select
//                   onChange={handleRegionChange}
//                   value={activeRegion.isoCode}
//                 >
//                   {regions.map((region, i) => (
//                     <Select.Option key={region.isoCode}>
//                       <div
//                         className="intl-icon-full"
//                         style={{
//                           backgroundImage: `url(${region.icon.file.url})`,
//                         }}
//                       />
//                       {region.name}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item label="Language">
//                 <Select
//                   onChange={handleLangChange}
//                   value={activeLanguage.isoCode}
//                 >
//                   {activeRegion.languages.map((lang, i) => (
//                     <Select.Option key={lang.isoCode}>
//                       <div
//                         className="intl-icon-full"
//                         style={{
//                           backgroundImage: `url(${lang.icon.file.url})`,
//                         }}
//                       />
//                       {lang.name}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Form>
//           </div>
//         }
//         overlayClassName="intl-selector-popover"
//         placement={isMobile ? 'right' : 'right'}
//       >
//         <div className="intl-icon">
//           <div
//             className="intl-icon-half left"
//             style={{ backgroundImage: `url(${activeRegion.icon.file.url})` }}
//           />
//           <div
//             className="intl-icon-half right"
//             style={{ backgroundImage: `url(${activeLanguage.icon.file.url})` }}
//           />
//         </div>
//       </Popover>
//     </div>
//   )
// }

// export default IntlSelector
