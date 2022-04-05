require('./styles.less')

import { ArrowRightOutlined } from '@ant-design/icons'
import { Col, Collapse, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useContentLists, useContentNavs } from '../../../hooks'

const { Panel } = Collapse

export const Footer = () => {
  const partnersList = [
    {
      data: useContentLists('partners.core')?.items,
      title: useContentLists('partners.core')?.label,
    },
    {
      data: useContentLists('partners.ecosystem')?.items,
      title: useContentLists('partners.ecosystem')?.label,
    },
    {
      data: useContentLists('partners.other')?.items,
      title: useContentLists('partners.other')?.label,
    },
    {
      data: useContentLists('partners.companies')?.items,
      title: useContentLists('partners.companies')?.label,
    },
  ]

  const footerLegal = useContentNavs('footerLegal')

  return (
    <footer className="footer">
      <div className="container">
        <Row gutter={30}>
          <Col md={{ offset: 1, span: 22 }} xs={24}>
            {partnersList.map((partners, i) => (
              <div className="collapse-wrapper " key={`partners-${i}`}>
                <Collapse
                  bordered={false}
                  className="partners"
                  defaultActiveKey={[`${i}`]}
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
        </Row>
      </div>

      <Row align="center" className="copyright" justify="center">
        <div className="legal-links">
          <ul>
            {footerLegal.elementsCollection?.items.map((item) => (
              <li key={item.title}>
                <Link href={item.slug}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <Col xs={24}>©lfca.earth {new Date().getFullYear()}</Col>
      </Row>
    </footer>
  )
}
