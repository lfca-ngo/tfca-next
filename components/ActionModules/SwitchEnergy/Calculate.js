import { Button, Col, Form, Input, Row, Select } from 'antd'
import Image from 'next/image'
import React from 'react'
import { isMobile } from 'react-device-detect'

import { text } from '../../../utils/Text'
import CheckList from '../../Elements/CheckList'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const ITEMS = {
  postcode: (blocks) => (
    <Form.Item
      name="postcode"
      rules={[
        {
          message: text(blocks['form.postcode.message']),
          required: true,
        },
        {
          message: text(blocks['form.postcode.pattern.message']),
          pattern: new RegExp(/^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/g),
        },
      ]}
    >
      <Input
        className="site-input-right"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder={text(blocks['form.postcode.placeholder'])}
        size="large"
        type="number"
      />
    </Form.Item>
  ),
  users: (blocks, usersInput) => (
    <Form.Item
      name="users"
      rules={[
        {
          message: text(blocks['form.users.message']),
          required: true,
        },
      ]}
    >
      <Select
        className="site-input-left"
        size="large"
        style={{ width: '100%' }}
      >
        {usersInput.map((user, i) => (
          <Select.Option key={i} label={user.label} value={user.valueNumber}>
            <div className="option-with-icon">
              <Image height={32} src={user.icon.url} width={32} /> {user.label}
            </div>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  ),
}

export const EnergyForm = ({ blocks, data, initialValues, onFinish }) => {
  return (
    <Form initialValues={initialValues} onFinish={onFinish}>
      <Row className="site-input-group-wrapper form-spacing">
        <Input.Group>
          <Row gutter={8}>
            <Col xs={isMobile ? 12 : 10}>
              {ITEMS.users(blocks, data?.input_users?.items)}
            </Col>
            <Col xs={isMobile ? 12 : 14}>{ITEMS.postcode(blocks)}</Col>
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
  const { data, setStore } = props

  const handleFinish = (allValues) => {
    setStore({
      postcode: allValues.postcode,
      users: allValues.users,
    })

    props.setProgress(0.5)
    props.goTo('results')
  }

  return (
    <div className="step">
      <Category
        goBack
        icon={props.icon}
        prev={() => props.goTo('intro')}
        title={text(props.blocks['category.title'])}
      />

      <StepHeader title={props.blocks['calculate.title']} />

      <CheckList data={props.lists?.benefits} />

      <EnergyForm
        {...props}
        initialValues={{ users: data?.input_users?.items[0]?.valueNumber }}
        onFinish={handleFinish}
      />
    </div>
  )
}

export default Calculate
