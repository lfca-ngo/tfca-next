require('./styles.less')

import {
  ArrowDownOutlined,
  CheckCircleFilled,
  FilePdfOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { Alert, Button, Carousel, Col, Collapse, Row, Tag } from 'antd'
import React from 'react'
import snarkdown from 'snarkdown'

const { Panel } = Collapse

const Disclosure = ({ data }) => {
  const {
    aboutStrategy,
    campaignContribution,
    campaignImages,
    campaignMeasureType,
    childActionData,
    goals,
    otherAction,
  } = data
  console.log(data)
  // const { activeLanguage } = useIntl()
  // const langKey = activeLanguage.isoCode
  const actionsList = data?.completedCompanyActions
  const showLanguageHint = false // langKey !== 'en-US'
  const languageHint = null //useContentfulBlock('translation.hint', true)

  const about = null // getMarkdown(aboutStrategy, langKey)
  const companyGoals = null // getMarkdown(goals, langKey)
  const campaign = null //getMarkdown(campaignContribution, langKey)
  const additionalAction = null // getMarkdown(otherAction, langKey)
  // const addAction = {
  //   title: 'Other',
  //   about: {
  //     childMarkdownRemark: {
  //       html: snarkdown(additionalAction),
  //     },
  //   },
  // }

  // if (additionalAction !== '') {
  //   actionsList.push(addAction)
  // }

  const hasCompensated =
    actionsList.findIndex((el) => el.actionId === 'companyPledge') > -1

  return (
    <div className="disclosure">
      {showLanguageHint && (
        <Alert
          className="lang-hint-alert"
          description={
            <div dangerouslySetInnerHTML={{ __html: languageHint }} />
          }
          showIcon
          type="info"
        />
      )}
      <header>
        <Row>
          <Col md={20} xs={16}>
            <h1>{data?.company.name}</h1>
          </Col>
          <Col md={4} xs={8}>
            <div className="logo-wrapper">
              <img src={data?.company.logo} />
            </div>
          </Col>
        </Row>
      </header>

      {campaign && (
        <section>
          <h3>Campaign Contribution</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: snarkdown(campaign),
            }}
          />
        </section>
      )}

      {companyGoals && (
        <section>
          <h3>Climate Goals 2021</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: snarkdown(companyGoals),
            }}
          />
        </section>
      )}

      {about && (
        <section>
          <h3>In Addition</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: snarkdown(about),
            }}
          />
        </section>
      )}

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
