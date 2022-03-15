require('./styles.less')

import { ArrowRightOutlined } from '@ant-design/icons'
import { Col, Collapse, List, Row } from 'antd'
import Link from 'next/link'
import React from 'react'

import { useBlocks, useLists, useNavs } from '../../../hooks/useTranslation'
import { text } from '../../../utils/Text'

const { Panel } = Collapse

export const Footer = () => {
  const partnersList = [
    {
      data: useLists('partners.core')?.items,
      title: text(useBlocks(['partners.core'])),
    },
    {
      data: useLists('partners.ecosystem')?.items,
      title: text(useBlocks(['partners.ecosystem'])),
    },
    {
      data: useLists('partners.other')?.items,
      title: text(useBlocks(['partners.other'])),
    },
  ]

  const footerLegal = useNavs('footerLegal')

  return (
    <footer className="footer">
      <div className="container">
        <Row gutter={30}>
          <Col md={16} xs={24}>
            {partnersList.map((partners, i) => (
              <div className="collapse-wrapper " key={`partners-${i}`}>
                <Collapse
                  bordered={false}
                  className="partners"
                  expandIcon={({ isActive }) => (
                    <ArrowRightOutlined
                      style={{
                        transform: `rotate(${isActive ? '90deg' : '0deg'})`,
                      }}
                    />
                  )}
                  expandIconPosition="right"
                >
                  <Panel header={partners?.title} key={`${i}`}>
                    {partners?.data.map((partner, j) => (
                      <div className="partner" key={`partner-${j}`}>
                        <img src={partner.icon?.url} />
                      </div>
                    ))}
                  </Panel>
                </Collapse>
              </div>
            ))}
          </Col>

          <Col md={8} xs={24}>
            <div className="collapse-wrapper">
              <Collapse
                bordered={false}
                className="partners"
                expandIcon={({ isActive }) => (
                  <ArrowRightOutlined
                    style={{
                      transform: `rotate(${isActive ? '90deg' : '0deg'})`,
                    }}
                  />
                )}
                expandIconPosition="right"
              >
                <Panel header={footerLegal.title} key="legal">
                  <List
                    dataSource={footerLegal.elementsCollection?.items}
                    renderItem={(item) => (
                      <List.Item>
                        <Link href={item.slug}>{item.title}</Link>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
            </div>
          </Col>
        </Row>
      </div>

      <Row align="center" className="copyright" justify="center">
        <Col xs={24}>©lfca.earth {new Date().getFullYear()}</Col>
      </Row>
    </footer>
  )
}
