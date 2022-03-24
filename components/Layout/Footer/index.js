require('./styles.less')

import { ArrowRightOutlined } from '@ant-design/icons'
import { Col, Collapse, List, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  useContentBlocks,
  useContentLists,
  useContentNavs,
} from '../../../hooks'
import { text } from '../../../utils/Text'

const { Panel } = Collapse

export const Footer = () => {
  const partnersList = [
    {
      data: useContentLists('partners.core')?.items,
      title: text(useContentBlocks(['partners.core'])),
    },
    {
      data: useContentLists('partners.ecosystem')?.items,
      title: text(useContentBlocks(['partners.ecosystem'])),
    },
    {
      data: useContentLists('partners.other')?.items,
      title: text(useContentBlocks(['partners.other'])),
    },
  ]

  const footerLegal = useContentNavs('footerLegal')

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
                        <Image
                          height={50}
                          layout="intrinsic"
                          objectFit="contain"
                          src={partner.icon?.url}
                          width={90}
                        />
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
