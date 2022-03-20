require('./styles.less')

import { Input } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { Select } from '../Select'

export const SelectWithOptionalInput = ({
  items = [],
  onChange,
  value = {},
  placeholderOptionalInput,
  placeholder,
}) => {
  const [selectValue, setSelectValue] = React.useState()
  const [inputValue, setInputValue] = React.useState('')

  const triggerChange = (changedValue) => {
    onChange?.({
      input: inputValue,
      select: selectValue,
      ...value,
      ...changedValue,
    })
  }

  const onSelectChange = (newVal) => {
    if (!('select' in value)) {
      setSelectValue(newVal)
    }
    triggerChange({ select: newVal })
  }

  const onInputChange = (e) => {
    const newInput = e.target.value
    if (!('input' in value)) {
      setInputValue(newInput)
    }
    triggerChange({ input: newInput })
  }

  const selectedItem = items.find(
    (item) => item.value === (value.select || selectValue)
  )
  const shouldShowInput = !!selectedItem?.hasOptionalInput

  return (
    <Input.Group
      className={classNames('select-with-optional-input', {
        'with-optional-input': shouldShowInput,
      })}
      compact
    >
      <Select
        items={items}
        onChange={onSelectChange}
        placeholder={placeholder}
        value={value.select || selectValue}
      />

      {shouldShowInput && (
        <Input
          className="optional-input"
          onChange={onInputChange}
          placeholder={placeholderOptionalInput}
          type="text"
          value={value.input || inputValue}
        />
      )}
    </Input.Group>
  )
}
