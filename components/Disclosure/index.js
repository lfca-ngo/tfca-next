require('./styles.less')

import { ArrowDownOutlined, CheckCircleFilled } from '@ant-design/icons'
import { Col, Collapse, Row } from 'antd'
import React from 'react'

const { Panel } = Collapse

const Disclosure = ({ data }) => {
  const actionsList = data?.completedCompanyActions

  return (
    <div className="disclosure">
      <header>
        <Row>
          <Col md={20} xs={16}>
            <h1>{data?.company.name}</h1>
          </Col>
          <Col md={4} xs={8}>
            <div className="logo-wrapper">
              <img src={data?.company?.logoUrl} />
            </div>
          </Col>
        </Row>
      </header>

      <section>
        <h4>Reduction Actions</h4>
        <p>
          The requirements mentioned for each of the actions are a general
          summary from all the campaign supporters, the detailed requirements
          may vary depending on the companies.
        </p>
        <Collapse
          accordion
          className="actions-wrapper"
          expandIcon={({ isActive }) => (
            <ArrowDownOutlined rotate={isActive ? 180 : 0} />
          )}
          expandIconPosition="right"
        >
          {actionsList &&
            actionsList.map((action, i) => {
              return (
                <Panel
                  className="actions-container"
                  header={
                    <span className="action">
                      <div className="icon">
                        <CheckCircleFilled />
                      </div>
                      <div className="inline">{action.title}</div>
                    </span>
                  }
                  key={i}
                >
                  {action.description && <div>action.description</div>}

                  {action.requirements && (
                    <div>
                      <h5>Requirements</h5>
                      <ul className="green-list">
                        {action.requirements.map((requirement, i) => {
                          return <li key={`list-${i}`}>{requirement.title}</li>
                        })}
                      </ul>
                    </div>
                  )}
                </Panel>
              )
            })}
        </Collapse>
      </section>
    </div>
  )
}

export default Disclosure
