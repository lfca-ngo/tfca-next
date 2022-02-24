import { Button, Card, Col, Form, List, Row, Select } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import ActionCard from '../../Elements/Cards/ActionCard'
import Category from '../ActionWrapper/Category'

const Results = (props) => {
  const availableOrganizationTypes = props.availableOrganizationTypes || []

  const handleNext = (item) => {
    props.setStore({ ...props.store, item: item })
    props.setProgress(0.3)
    props.goTo('details', { smooth: true })
  }
  const handleValuesChange = (changedValues, allValues) => {
    props.setStore({ ...props.store, ...changedValues })
  }

  const filterByAttributes = (item) => {
    const { type } = props.store
    const tags = item?.tagsCollection?.items?.map((i) => i.key)

    const matchesTag = type ? tags?.some((t) => type?.includes(t)) : true

    if (matchesTag) return true
    else return false
  }

  const data = props.data['organizations'] || []

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
          <Select allowClear placeholder="Please select" size="small">
            {availableOrganizationTypes.map((item) => (
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
            <ActionCard item={item} onNext={handleNext} />
          </List.Item>
        )}
      />
    </div>
  )
}

export default Results
