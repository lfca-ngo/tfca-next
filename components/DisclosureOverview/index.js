require('./styles.less')

import { Button, Card, Col, Input, List, Row, Select, Tabs } from 'antd'
import React, { useState } from 'react'

import { DisclosureDrawer } from '../Disclosure/DisclosureDrawer'
import CheckList from '../Elements/CheckList'

const { Search } = Input
const { TabPane } = Tabs

export const DisclosureOverview = ({ items }) => {
  const [activeItem, setActiveItem] = useState()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (val) => {
    const searchResults = items.filter(({ company }) => {
      const name = company.name.toLowerCase()
      const key = val.toLowerCase()
      return name.indexOf(key) > -1
    })
    setSearchResults(searchResults)
  }

  const handleSelect = (item) => {
    setActiveItem(item)
    setDrawerVisible(true)
  }

  return (
    <div className="disclosure-overview">
      <div className="container">
        <div className="navigation">
          <Row>
            <Col md={12} xs={24}>
              <h3>All Companies</h3>
            </Col>
            <Col md={6} style={{ paddingRight: '14px' }} xs={12}>
              <Select
                placeholder="Filter"
                size="large"
                style={{ width: '100%' }}
              >
                <Select.Option key="material">-</Select.Option>
              </Select>
            </Col>
            <Col md={6} xs={12}>
              <Search
                onSearch={handleSearch}
                placeholder="Search a company"
                size="large"
              />
            </Col>
          </Row>
        </div>

        <div className="overview-wrapper">
          <List
            bordered={false}
            className="fill-space"
            dataSource={searchResults.length > 0 ? searchResults : items}
            grid={{
              gutter: 16,
              lg: 2,
              md: 2,
              sm: 2,
              xl: 4,
              xs: 1,
              xxl: 4,
            }}
            pagination={{ pageSize: 40, showSizeChanger: false }}
            renderItem={(item) => {
              const actionsList = item.completedCompanyActions.map(
                (action) => ({ value: action.title })
              )
              // TODO: Re-add campaign info
              // const campaign = getMarkdown(item.campaignContribution, 'en')
              return (
                <List.Item className="contribution-item">
                  <Card
                    className="company-card"
                    hoverable
                    title={
                      <div className="logo-wrapper no-border">
                        <img src={item.company.logoUrl} />
                      </div>
                    }
                  >
                    <Tabs defaultActiveKey="a" size="small">
                      <TabPane key="a" tab={'Actions'}>
                        <CheckList data={actionsList} limit={3} />
                        {actionsList.length > 3 && (
                          <div className="show-more">
                            ...click view to show all
                          </div>
                        )}
                      </TabPane>
                      <TabPane key="b" tab={'Contribution'}>
                        {/* <div
                          className="contributions"
                          dangerouslySetInnerHTML={{
                            __html: snarkdown(campaign),
                          }}
                        /> */}
                      </TabPane>
                      {/* {item.campaignImages && (
                        <TabPane key="c" tab={'Material'}>
                          <Carousel
                            className="preview-images"
                            infinite={false}
                            slidesToShow={2}
                          >
                            {item.campaignImages.map((image, i) => (
                              <Image
                                key={`img-${i}`}
                                src={image.campaignImageUrl}
                              />
                            ))}
                          </Carousel>
                        </TabPane>
                      )} */}
                    </Tabs>

                    <Button
                      block
                      onClick={() => handleSelect(item)}
                      size="large"
                      style={{ alignSelf: 'flex-end' }}
                      type="primary"
                    >
                      View all
                    </Button>
                  </Card>
                </List.Item>
              )
            }}
          />
        </div>
      </div>

      <DisclosureDrawer
        data={activeItem}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      />
    </div>
  )
}
