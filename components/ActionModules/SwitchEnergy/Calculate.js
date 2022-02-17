import Icon from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import React, { useState } from 'react'

import IconFourPeople from '../../../assets/icons/person-four.svg'
import IconOnePerson from '../../../assets/icons/person-one.svg'
import IconThreePeople from '../../../assets/icons/person-three.svg'
import IconTwoPeople from '../../../assets/icons/person-two.svg'
// import { renderAsHtml } from '../../../utils'
import CheckList from '../../Elements/CheckList'
// import { useIsMobile } from "../../../utils/IsMobileProvider";
import Category from '../Category'

export const USERS = [
  { title: '1 Pers.', kwh: 1300, icon: <Icon component={IconOnePerson} /> },
  { title: '2 Pers.', kwh: 2300, icon: <Icon component={IconTwoPeople} /> },
  { title: '3 Pers.', kwh: 3200, icon: <Icon component={IconThreePeople} /> },
  { title: '4+ Pers.', kwh: 4000, icon: <Icon component={IconFourPeople} /> },
]

export const ITEMS = {
  postcode: () => (
    <Form.Item
      name="postcode"
      rules={[
        {
          required: true,
          message: 'Bitte eine PLZ angeben!',
        },
        {
          pattern: new RegExp(/^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/g),
          message: 'Postleitzahl mit 5 Ziffern',
        },
      ]}
    >
      <Input
        className="site-input-right"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Postleitzahl"
        size="large"
        type="number"
      />
    </Form.Item>
  ),
  users: () => (
    <Form.Item
      name="users"
      rules={[{ required: true, message: 'Number of flatmates' }]}
    >
      <Select
        className="site-input-left"
        size="large"
        style={{ width: '100%' }}
      >
        {USERS.map((user, i) => (
          <Select.Option key={i} label={user.title} value={user.kwh}>
            <div className="option-with-icon">
              {user.icon} {user.title}
            </div>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  ),
}

export const EnergyForm = (props) => {
  const { isMobile } = useIsMobile()
  return (
    <Form initialValues={props.initialValues} onFinish={props.onFinish}>
      <Row className="site-input-group-wrapper form-spacing">
        <Input.Group>
          <Row>
            <Col xs={isMobile ? 12 : 10}>{ITEMS.users()}</Col>
            <Col xs={isMobile ? 12 : 14}>{ITEMS.postcode()}</Col>
          </Row>
        </Input.Group>

        <Col xs={24}>
          <Button block htmlType="submit" size="large" type="primary">
            Finde passende Tarife
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

const Calculate = (props) => {
  const handleFinish = (allValues) => {
    props.setPostcode(allValues.postcode)
    props.setEnergyKwh(allValues.users)
    props.setProgress(0.5)
    props.goTo('results')
  }

  return (
    <div className="step">
      <Category
        goBack
        prev={() => props.goTo('intro')}
        title={props.module.categoryTitle}
        type={props.name}
      />

      <h2>{props.module.stepCalculateTitle}</h2>
      {/* {renderAsHtml(props.module.stepCalculateText)} */}

      <CheckList data={props.module.arguments} />

      <EnergyForm
        {...props}
        initialValues={{ users: USERS[0].kwh }}
        onFinish={handleFinish}
      />
    </div>
  )
}

export default Calculate