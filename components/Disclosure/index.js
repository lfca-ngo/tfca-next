require('./styles.less')

import { ArrowDownOutlined, CheckCircleFilled } from '@ant-design/icons'
import { Col, Collapse, Row } from 'antd'
import React from 'react'

import { CircleImage } from '../Elements/CircleImage'

const { Panel } = Collapse

const Disclosure = ({ data }) => {
  const actionsList = data?.completedCompanyActions
  const campaignContributionMap = data.company.campaignParticipationPackages

  return (
    <div className="disclosure">
      <header>
        <Row>
          <Col md={20} xs={16}>
            <h1>{data?.company.name}</h1>
          </Col>
          <Col md={4} xs={8}>
            <CircleImage size={100} src={data?.company?.logoUrl} />
          </Col>
        </Row>
      </header>

      <section>
        <h4>Campaign contribution</h4>
        <p>{data.company.campaignGoals}</p>
        <Collapse
          accordion
          className="actions-wrapper"
          expandIcon={({ isActive }) => (
            <ArrowDownOutlined rotate={isActive ? 180 : 0} />
          )}
          expandIconPosition="right"
        >
          {campaignContributionMap &&
            Object.keys(campaignContributionMap).map((participationPackage) => {
              const objectives = campaignContributionMap[participationPackage]
              return (
                <Panel
                  className="actions-container"
                  header={
                    <span className="action">
                      <div className="icon">
                        <CheckCircleFilled />
                      </div>
                      <div className="inline">{participationPackage}</div>
                    </span>
                  }
                  key={participationPackage}
                >
                  {objectives && (
                    <div>
                      <h5>Objectives</h5>
                      <ul className="green-list">
                        {objectives.map((objective) => {
                          return <li key={objective}>{objective}</li>
                        })}
                      </ul>
                    </div>
                  )}
                </Panel>
              )
            })}
        </Collapse>
      </section>

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
            actionsList.map((action) => {
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
                  key={action.contentId}
                >
                  {/* TODO: Replace the fallback */}
                  {action.description && <div>action.description</div>}

                  {action.requirements && (
                    <div>
                      <h5>Requirements</h5>
                      <ul className="green-list">
                        {action.requirements.map((requirement) => {
                          return (
                            <li key={requirement.contentId}>
                              {requirement.title}
                            </li>
                          )
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
