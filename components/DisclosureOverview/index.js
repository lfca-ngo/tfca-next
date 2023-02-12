require('./styles.less')

import { Button, Card, Col, Drawer, Input, List, Row, Select, Tabs } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'

import { Disclosure } from '../Disclosure'
import { CheckList } from '../Elements'

const { Search } = Input
const { TabPane } = Tabs

export const DisclosureOverview = ({ items }) => {
  const [activeItem, setActiveItem] = useState()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (val) => {
    const searchResults = items.filter((company) => {
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
      <div className="container-max">
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
                (action) => ({
                  value: action.title,
                })
              )

              // We only show the participation packages where the company checked at least one objective
              const contributionList = Object.keys(
                item.campaignParticipationPackages || {}
              ).map((c) => ({ value: c }))

              return (
                <List.Item className="contribution-item">
                  <Card
                    className="company-card"
                    hoverable
                    title={
                      <div className="logo-wrapper no-border">
                        <Image
                          height={60}
                          layout="intrinsic"
                          objectFit="contain"
                          src={item?.logoUrl}
                          width={120}
                        />
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
                        <CheckList data={contributionList} limit={3} />
                        {contributionList.length > 3 && (
                          <div className="show-more">
                            ...click view to show all
                          </div>
                        )}
                      </TabPane>
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

        <Drawer
          className="drawer-md"
          onClose={() => setDrawerVisible(!drawerVisible)}
          visible={drawerVisible}
        >
          <Disclosure data={activeItem} />
        </Drawer>
      </div>
    </div>
  )
}
