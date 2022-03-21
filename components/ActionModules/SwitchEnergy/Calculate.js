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
  users: (blocks, usersInput) =>
    console.log('usersInput', usersInput) || (
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
          {usersInput.map((option, i) => (
            <Select.Option
              key={i}
              label={option.label}
              value={option.valueNumber}
            >
              <span className="option-with-icon">
                {option.icon?.url && (
                  <Image height={32} src={option.icon.url} width={32} />
                )}
                <span className="option-label">{option.label}</span>
              </span>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    ),
}

export const EnergyForm = ({
  initialValues,
  moduleBlocks,
  moduleData,
  onFinish,
}) => {
  return (
    <Form initialValues={initialValues} onFinish={onFinish}>
      <Row className="site-input-group-wrapper form-spacing">
        <Input.Group>
          <Row gutter={8}>
            <Col xs={isMobile ? 12 : 10}>
              {ITEMS.users(moduleBlocks, moduleData?.['input.users']?.items)}
            </Col>
            <Col xs={isMobile ? 12 : 14}>{ITEMS.postcode(moduleBlocks)}</Col>
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

export const Calculate = ({
  goTo,
  icon,
  moduleBlocks,
  moduleData,
  moduleLists,
  setStore,
  store,
}) => {
  const handleFinish = (allValues) => {
    setStore({
      postcode: allValues.postcode,
      users: allValues.users,
    })
    goTo('results')
  }

  return (
    <div className="step">
      <Category
        goBack={() => goTo('intro')}
        icon={icon}
        title={text(moduleBlocks['category.title'])}
      />

      <StepHeader title={moduleBlocks['calculate.title']} />

      <CheckList data={moduleLists?.benefits} />

      <EnergyForm
        initialValues={{
          postcode: store?.postcode,
          users:
            store?.users || moduleData?.['input.users']?.items[0]?.valueNumber,
        }}
        moduleBlocks={moduleBlocks}
        moduleData={moduleData}
        onFinish={handleFinish}
      />
    </div>
  )
}
