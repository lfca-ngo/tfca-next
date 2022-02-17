// require('./styles.less')

// import {
//   ArrowDownOutlined,
//   CheckCircleFilled,
//   FilePdfOutlined,
//   InfoCircleOutlined,
// } from '@ant-design/icons'
// import { Alert, Button, Carousel, Col, Collapse, Image, Row, Tag } from 'antd'
// import React from 'react'
// import snarkdown from 'snarkdown'

// import { getFileTypeFromUrl, getMarkdown } from '../../utils'
// import { defaultLangKey } from '../../utils/siteConfig'
// import useContentfulBlock from '../../utils/useContentfulBlock'
// import useIntl from '../../utils/useIntl'
// import { MeasureType } from './helpers'

// const { Panel } = Collapse

// const Disclosure = ({ company }) => {
//   const {
//     aboutStrategy,
//     campaignContribution,
//     campaignImages,
//     campaignMeasureType,
//     childActionData,
//     goals,
//     otherAction,
//   } = company
//   const { activeLanguage } = useIntl()
//   const langKey = activeLanguage.isoCode
//   const actionsList = childActionData.actions
//   const showLanguageHint = langKey !== defaultLangKey
//   const languageHint = useContentfulBlock('translation.hint', true)

//   const about = getMarkdown(aboutStrategy, langKey)
//   const companyGoals = getMarkdown(goals, langKey)
//   const campaign = getMarkdown(campaignContribution, langKey)
//   const additionalAction = getMarkdown(otherAction, langKey)
//   const addAction = {
//     title: 'Other',
//     about: {
//       childMarkdownRemark: {
//         html: snarkdown(additionalAction),
//       },
//     },
//   }

//   if (additionalAction !== '') {
//     actionsList.push(addAction)
//   }

//   const hasCompensated =
//     actionsList.findIndex((el) => el.actionId === 'companyPledge') > -1

//   return (
//     <div className="disclosure">
//       {showLanguageHint && (
//         <Alert
//           className="lang-hint-alert"
//           description={
//             <div dangerouslySetInnerHTML={{ __html: languageHint }} />
//           }
//           showIcon
//           type="info"
//         />
//       )}
//       <header>
//         <Row>
//           <Col md={20} xs={16}>
//             <h1>{company.name}</h1>
//           </Col>
//           <Col md={4} xs={8}>
//             <div className="logo-wrapper">
//               <img src={company.logo} />
//             </div>
//           </Col>
//         </Row>
//       </header>

//       {campaign && (
//         <section>
//           <h3>Campaign Contribution</h3>
//           <div
//             dangerouslySetInnerHTML={{
//               __html: snarkdown(campaign),
//             }}
//           />
//         </section>
//       )}

//       {companyGoals && (
//         <section>
//           <h3>Climate Goals 2021</h3>
//           <div
//             dangerouslySetInnerHTML={{
//               __html: snarkdown(companyGoals),
//             }}
//           />
//         </section>
//       )}

//       {about && (
//         <section>
//           <h3>In Addition</h3>
//           <div
//             dangerouslySetInnerHTML={{
//               __html: snarkdown(about),
//             }}
//           />
//         </section>
//       )}

//       {campaignImages && (
//         <section>
//           <h3>Material</h3>
//           <Carousel
//             className="preview-images"
//             infinite={false}
//             slidesToShow={3}
//           >
//             {campaignImages.map((image, i) => {
//               const fileType = getFileTypeFromUrl(image.campaignImageUrl)
//               const isPdf = fileType === 'pdf'
//               if (isPdf)
//                 return (
//                   <a
//                     href={image.campaignImageUrl}
//                     rel="noreferrer"
//                     target="_blank"
//                   >
//                     <Button
//                       icon={<FilePdfOutlined />}
//                       size="large"
//                       type="primary"
//                     >
//                       Open pdf document
//                     </Button>
//                   </a>
//                 )
//               return <Image key={`img-${i}`} src={image.campaignImageUrl} />
//             })}
//           </Carousel>
//         </section>
//       )}

//       {company.footprint && (
//         <section>
//           <h3>Carbon Footprint</h3>
//           {!company.hideFootprint && (
//             <Tag color="blue">{company.footprint.toFixed(0)} t p.a.</Tag>
//           )}
//           <MeasureType type={campaignMeasureType} />
//           {hasCompensated && <Tag color="cyan">Footprint Compensated</Tag>}
//         </section>
//       )}

//       <section>
//         <h3>Reduction Actions</h3>
//         <p>
//           The requirements mentioned for each of the actions are a general
//           summary from all the campaign supporters, the detailed requirements
//           may vary depending on the companies.
//         </p>
//         <Collapse
//           accordion
//           className="actions-wrapper"
//           expandIcon={({ isActive }) => (
//             <ArrowDownOutlined rotate={isActive ? 180 : 0} />
//           )}
//           expandIconPosition="right"
//         >
//           {actionsList &&
//             actionsList.map((action, i) => {
//               return (
//                 <Panel
//                   className="actions-container"
//                   header={
//                     <span className="action">
//                       <div className="icon">
//                         <CheckCircleFilled />
//                       </div>
//                       <div className="inline">{action.title}</div>
//                     </span>
//                   }
//                   key={i}
//                 >
//                   {action.about && (
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: action.about.childMarkdownRemark.html,
//                       }}
//                     />
//                   )}

//                   {action.requirements && (
//                     <div>
//                       <h5>Requirements</h5>
//                       <ul className="green-list">
//                         {Object.keys(action.requirements).map((key, i) => {
//                           const requirement = action.requirements[key]
//                           return <li key={`list-${i}`}>{requirement.title}</li>
//                         })}
//                       </ul>
//                     </div>
//                   )}
//                 </Panel>
//               )
//             })}
//         </Collapse>
//       </section>
//     </div>
//   )
// }

// export default Disclosure
