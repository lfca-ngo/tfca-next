import { Button, Card, Col, Form, List, Row, Select } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import ActionCard from '../../Elements/Cards/ActionCard'
import Category from '../helpers/Category'

const Results = (props) => {
  const availableFilters = props.availableFilters || []

  const handleNext = (item) => {
    props.setStore({ ...props.store, item: item })
    props.setProgress(0.3)
    props.goTo('details', { smooth: true })
  }
  const handleValuesChange = (changedValues, allValues) => {
    props.setStore({ ...props.store, ...changedValues })
  }

  const filterByAttributes = (item) => {
    for (const availableFilter of availableFilters) {
      const { fieldName } = availableFilter
      const collectionName = `${fieldName}Collection`
      const itemValues = item?.[collectionName]?.items?.map((i) => i.key)

      const storeValues = props.store[fieldName]

      console.log(collectionName, itemValues, storeValues)

      const matches = itemValues
        ? storeValues?.some((v) => itemValues?.includes(v))
        : true
      if (!matches) return false
    }
    return true
  }

  const data = props.data['main']?.items || []
  console.log(data, availableFilters, props.store)
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
        {availableFilters.map((filter) => (
          <Form.Item
            key={filter?.fieldName}
            label="Job Type"
            name={filter?.fieldName}
          >
            <Select allowClear placeholder="Please select" size="small">
              {filter?.options.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ))}
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
