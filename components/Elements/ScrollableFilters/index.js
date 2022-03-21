import { Form, Select } from 'antd'
import React from 'react'

export const ScrollableFilters = (props) => {
  const handleValuesChange = (changedValues) => {
    props.setStore({ ...props.store, ...changedValues })
  }

  return (
    <>
      <Form
        className="scrollable-filters"
        initialValues={props.store}
        layout="vertical"
        onValuesChange={handleValuesChange}
      >
        {props.availableFilters.map((filter) => {
          const isMultiSelect = filter?.filterMode?.indexOf('-multi') > -1
          return (
            <Form.Item
              key={filter?.fieldName}
              label={filter?.label}
              name={filter?.fieldName}
            >
              <Select
                allowClear={isMultiSelect}
                dropdownMatchSelectWidth={false}
                maxTagCount={0}
                maxTagPlaceholder={(omittedValues) =>
                  `${omittedValues.length} filters`
                }
                mode={isMultiSelect ? 'multiple' : null}
                placeholder="Please select"
                size="small"
              >
                {filter?.options.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )
        })}
        {(props.additionalItems || []).map((item) => item)}
      </Form>
      <div className="scrollable-filter-spacer" />
    </>
  )
}
