require('./styles.less')

import { Input } from 'antd'
import React from 'react'

import { Select } from '../Select'

export const SelectWithOptionalInput = ({
  items = [],
  onChange,
  value = {},
  placeholderOptionalInput,
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
    <div className="select-with-optional-input">
      <Select
        items={items}
        onChange={onSelectChange}
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
    </div>
  )
}
