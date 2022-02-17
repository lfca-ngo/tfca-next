// require('./styles.less')

// import {
//   Button,
//   Card,
//   Carousel,
//   Col,
//   Drawer,
//   Image,
//   Input,
//   List,
//   Row,
//   Select,
//   Tabs,
// } from 'antd'
// import { graphql, useStaticQuery } from 'gatsby'
// import React, { useState } from 'react'
// import snarkdown from 'snarkdown'

// import CheckList from '../../components/Elements/CheckList'
// import { getMarkdown } from '../../utils'
// import { useIsMobile } from '../../utils/IsMobileProvider'
// import Disclosure from '../Disclosure'

// const { Search } = Input
// const { TabPane } = Tabs

// const DisclosureOverview = (props) => {
//   const [activeCompany, setActiveCompany] = useState()
//   const [drawerVisible, setDrawerVisible] = useState(false)
//   const [searchResults, setSearchResults] = useState([])
//   const { isMobile } = useIsMobile()
//   const { data } = props
//   const { nodes: companies } = data

//   const handleSearch = (val) => {
//     const searchResults = companies.filter((company) => {
//       const name = company.name.toLowerCase()
//       const key = val.toLowerCase()
//       return name.indexOf(key) > -1
//     })
//     setSearchResults(searchResults)
//   }

//   const handleSelect = (company) => {
//     setActiveCompany(company)
//     setDrawerVisible(true)
//   }

//   return (
//     <div className="disclosure-overview">
//       <div className="container">
//         <div className="navigation">
//           <Row>
//             <Col md={12} xs={24}>
//               <h3>All Companies</h3>
//             </Col>
//             <Col md={6} style={{ paddingRight: '14px' }} xs={12}>
//               <Select
//                 placeholder="Filter"
//                 size="large"
//                 style={{ width: '100%' }}
//               >
//                 <Select.Option key="material">-</Select.Option>
//               </Select>
//             </Col>
//             <Col md={6} xs={12}>
//               <Search
//                 onSearch={handleSearch}
//                 placeholder="Search a company"
//                 size="large"
//               />
//             </Col>
//           </Row>
//         </div>

//         <div className="overview-wrapper">
//           <List
//             bordered={false}
//             className="fill-space"
//             dataSource={searchResults.length > 0 ? searchResults : companies}
//             grid={{
//               gutter: 16,
//               xs: 1,
//               sm: 2,
//               md: 2,
//               lg: 2,
//               xl: 4,
//               xxl: 4,
//             }}
//             pagination={{ pageSize: 40, showSizeChanger: false }}
//             renderItem={(item, index) => {
//               const actionsList = item.childActionData.actions.map(
//                 (action) => action.title
//               )
//               const campaign = getMarkdown(item.campaignContribution, 'en')
//               return (
//                 <List.Item className="contribution-item">
//                   <Card
//                     className="company-card"
//                     hoverable
//                     title={
//                       <div className="logo-wrapper no-border">
//                         <img src={item.logo} />
//                       </div>
//                     }
//                   >
//                     <Tabs defaultActiveKey="a" size="small">
//                       <TabPane key="a" tab={'Actions'}>
//                         <CheckList data={actionsList} limit={6} />
//                         {actionsList.length > 6 && (
//                           <div className="show-more">
//                             ...click view to show all
//                           </div>
//                         )}
//                       </TabPane>
//                       <TabPane key="b" tab={'Contribution'}>
//                         <div
//                           className="contributions"
//                           dangerouslySetInnerHTML={{
//                             __html: snarkdown(campaign),
//                           }}
//                         />
//                       </TabPane>
//                       {item.campaignImages && (
//                         <TabPane key="c" tab={'Material'}>
//                           <Carousel
//                             className="preview-images"
//                             infinite={false}
//                             slidesToShow={2}
//                           >
//                             {item.campaignImages.map((image, i) => (
//                               <Image
//                                 key={`img-${i}`}
//                                 src={image.campaignImageUrl}
//                               />
//                             ))}
//                           </Carousel>
//                         </TabPane>
//                       )}
//                     </Tabs>

//                     <Button
//                       block
//                       onClick={() => handleSelect(item)}
//                       size="large"
//                       style={{ alignSelf: 'flex-end' }}
//                       type="primary"
//                     >
//                       View all
//                     </Button>
//                   </Card>
//                 </List.Item>
//               )
//             }}
//           />
//         </div>
//       </div>

//       <Drawer
//         closable={true}
//         onClose={() => setDrawerVisible(false)}
//         placement="left"
//         visible={drawerVisible}
//         width={isMobile ? '100%' : '70%'}
//       >
//         <div className="drawer-content">
//           <Tabs tabPosition={isMobile ? 'top' : 'left'}>
//             <TabPane key={'0'} tab={'Information'}>
//               {activeCompany && (
//                 <div className="page-content">
//                   <Disclosure company={activeCompany} />
//                   <p>
//                     Visit the{' '}
//                     <a href={`https://tfca.earth/${activeCompany.url}`}>
//                       campaign page
//                     </a>{' '}
//                     of {activeCompany.name}
//                   </p>
//                 </div>
//               )}
//             </TabPane>

//             {activeCompany && activeCompany.campaignImages && (
//               <TabPane key={'1'} tab={'Material'}>
//                 <div className="page-content">
//                   <h1></h1>
//                   <Carousel
//                     className="preview-images"
//                     infinite={false}
//                     slidesToShow={2}
//                   >
//                     {activeCompany.campaignImages.map((image, i) => (
//                       <Image key={`img-${i}`} src={image.campaignImageUrl} />
//                     ))}
//                   </Carousel>
//                 </div>
//               </TabPane>
//             )}
//           </Tabs>
//         </div>
//       </Drawer>
//     </div>
//   )
// }

// const DataWrapper = (props) => {
//   const { allCompanies: data } = useStaticQuery(graphql`
//     query {
//       allCompanies(
//         filter: {
//           hasCampaignQualification: { eq: true }
//           hidePage: { ne: true }
//         }
//         sort: { fields: employeeCount, order: DESC }
//       ) {
//         nodes {
//           ...CompanyDisclosure
//         }
//       }
//     }
//   `)
//   return <DisclosureOverview data={data} {...props} />
// }

// export default DataWrapper
