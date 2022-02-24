require('./styles.less')

import { Checkbox } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'

export const MultiSelect = ({
  value = {},
  onChange,
  items = [],
  singleMode,
}) => {
  const [selected, setSelected] = useState([])

  const triggerChange = (changedValue) => {
    onChange?.({
      selected,
      ...value,
      ...changedValue,
    })
  }

  const onCheckboxChange = (selectedValues) => {
    let newValues = selectedValues
    // in single mode only one value can be selected
    if (singleMode) {
      // get the latest change by checking the difference to the state
      const [latestChange] = selectedValues.filter((v) => !selected.includes(v))
      newValues = [latestChange]
    }

    setSelected(newValues)

    triggerChange({
      selected: newValues,
    })
  }

  return (
    <span className="multi-select">
      <Checkbox.Group onChange={onCheckboxChange} value={selected}>
        {items.map((item, i) => (
          <Checkbox
            key={`selected-${i}`}
            style={{ lineHeight: '32px' }}
            value={item.value}
          >
            <span className="label-wrapper">
              {item.iconUrl && (
                <span className="icon">
                  <Image height={20} src={item.iconUrl} width={20} />
                </span>
              )}
              {item.label}
            </span>
          </Checkbox>
        ))}
      </Checkbox.Group>
    </span>
  )
}
