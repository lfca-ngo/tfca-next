require('./styles.less')

import { Form } from 'antd'
import React from 'react'

import { MULTI } from '../../../utils'
import { SelectFilter } from '../SelectFilter'

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
          const isMultiple = filter?.filterMode.indexOf(MULTI) > -1
          return (
            <Form.Item
              key={filter?.fieldName}
              label={filter?.label}
              name={filter?.fieldName}
            >
              <SelectFilter
                allowClear={isMultiple}
                dropdownMatchSelectWidth={false}
                filterMode={isMultiple ? 'select-multi' : 'select-single'}
                maxTagCount={0}
                maxTagPlaceholder={(omittedValues) =>
                  `${omittedValues.length} filters`
                }
                options={filter?.options || []}
                placeholder={filter?.placeholder}
              />
            </Form.Item>
          )
        })}
        {(props.additionalItems || []).map((item) => item)}
      </Form>
      <div className="scrollable-filters-spacer" />
    </>
  )
}
