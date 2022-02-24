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
  const handleValuesChange = (changedValues, allValues) => {
    props.setStore({ ...props.store, ...changedValues })
  }

  const filterByAttributes = (item) => {
    const { type } = props.store
    const tags = item?.tagsCollection?.items?.map((i) => i.key)

    if (tags?.some((t) => type.includes(t))) return true
    else return false
  }

  const data = props.data['actions'] || []

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
        onValuesChange={handleValuesChange}
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
        dataSource={data.filter(filterByAttributes)}
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
