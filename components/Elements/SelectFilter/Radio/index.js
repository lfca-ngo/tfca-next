require('./styles.less')

import { Checkbox } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'

export const Radio = ({
  value = [],
  onChange,
  items = [],
  singleMode,
  onSelect,
  quizAnswerStatus,
}) => {
  const [selected, setSelected] = useState(value)

  const triggerChange = (changedValue) => {
    onChange?.(changedValue)
  }

  const onCheckboxChange = (selectedValues) => {
    onSelect && onSelect(selectedValues)

    let newValues = selectedValues
    // in single mode only one value can be selected
    if (singleMode) {
      // get the latest change by checking the difference to the state
      const [latestChange] = selectedValues.filter((v) => !selected.includes(v))
      newValues = [latestChange]
    }

    setSelected(newValues)

    triggerChange(newValues)
  }

  return (
    <span className={classNames('multi-select', quizAnswerStatus)}>
      <Checkbox.Group onChange={onCheckboxChange} value={selected}>
        {items.map((item, i) => (
          <Checkbox
            className={classNames({ correct: item.isCorrect })}
            key={`selected-${i}`}
            style={{ lineHeight: '32px' }}
            value={item.value}
          >
            <span className="label-wrapper">
              {item.iconUrl && (
                <span className="icon">
                  <Image height={25} src={item.iconUrl} width={25} />
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
