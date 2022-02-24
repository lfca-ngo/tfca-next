import { Button, Card, Col, Form, List, Row, Select } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import Category from '../ActionWrapper/Category'

const Results = (props) => {
  const availableJobTypes = props.availableJobTypes || []
  const availableJobLevels = props.availableJobLevels || []

  const handleNext = () => {
    props.setProgress(0.3)
    props.goTo('calculate', { smooth: true })
  }
  const handleUsesAlready = () => {
    props.setProgress(0.5)
    props.goTo('check')
  }

  const data = props.data['actions'] || []
  console.log(props)
  return (
    <div className="step">
      <Category
        goBack
        prev={() => props.goTo('intro')}
        title={text(props.blocks['category.title'])}
        type={props.name}
      />
      <h2>{text(props.blocks['intro.title'])}</h2>

      <Form
        className="scrollable-filters"
        initialValues={props.store}
        layout="vertical"
        onFinish={(v) => console.log(v)}
      >
        <Form.Item label="Job Type" name="type">
          <Select size="small">
            {availableJobTypes.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Job Level" name="level">
          <Select size="small">
            {availableJobLevels.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card>
              <Card.Meta
                description={<Text block={item.description} />}
                title={item.name}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Results
