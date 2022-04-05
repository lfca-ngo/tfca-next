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
    setSelectValue(newVal)
    triggerChange({ select: newVal })
  }

  const onInputChange = (e) => {
    const newInput = e.target.value
    setInputValue(newInput)
    triggerChange({ input: newInput })
  }

  const selectedItem = items.find(
    (item) => item.value === (value.select || selectValue)
  )
  const shouldShowInput = !!selectedItem?.hasOptionalInput

  return (
    <Input.Group
      className={classNames('select-with-optional-input', 'equal-height', {
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
          inputMode="numeric"
          onChange={onInputChange}
          pattern="[0-9]*"
          placeholder={placeholderOptionalInput}
          type="number"
          value={value.input || inputValue}
        />
      )}
    </Input.Group>
  )
}
