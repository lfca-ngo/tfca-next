import { Input } from 'antd'
import React from 'react'

import { Select } from '../../Elements/SelectFilter/Select'

export const SelectPostcodeEnergy = ({
  items = [],
  onChange,
  value = {},
  placeholderInput,
  placeholderSelect,
}) => {
  const [selectValue, setSelectValue] = React.useState()
  const [inputValue, setInputValue] = React.useState('')

  const triggerChange = (changedValue) => {
    onChange?.({
      energy: selectValue,
      postcode: inputValue,
      ...value,
      ...changedValue,
    })
  }

  const onSelectChange = (newVal) => {
    setSelectValue(newVal)
    triggerChange({ energy: newVal })
  }

  const onInputChange = (e) => {
    const newInput = e.target.value
    setInputValue(newInput)
    triggerChange({ postcode: newInput })
  }

  return (
    <Input.Group className={'select-postcode-users'} compact>
      <Select
        items={items}
        onChange={onSelectChange}
        placeholder={placeholderSelect}
        style={{ width: '50%' }}
        value={value.energy || selectValue}
      />

      <Input
        className="optional-input"
        inputMode="numeric"
        onChange={onInputChange}
        pattern="[0-9]*"
        placeholder={placeholderInput}
        style={{ width: '50%' }}
        type="number"
        value={value.postcode || inputValue}
      />
    </Input.Group>
  )
}
