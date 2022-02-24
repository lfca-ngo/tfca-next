import { Checkbox } from 'antd'
import React, { useState } from 'react'

export const MultiSelect = ({ value = {}, onChange, items = [] }) => {
  const [selected, setSelected] = useState([])

  const triggerChange = (changedValue) => {
    onChange?.({
      selected,
      ...value,
      ...changedValue,
    })
  }

  const onCheckboxChange = (selectedValues) => {
    setSelected(selectedValues)

    triggerChange({
      selected: selectedValues,
    })
  }

  return (
    <span>
      <Checkbox.Group onChange={onCheckboxChange}>
        {items.map((item, i) => (
          <Checkbox
            key={`selected-${i}`}
            style={{ lineHeight: '32px' }}
            value={item.value}
          >
            {item.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </span>
  )
}
