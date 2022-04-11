require('./styles.less')

import { QuestionCircleOutlined } from '@ant-design/icons'
import { Checkbox, Popover } from 'antd'
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
  layout,
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
    <span className={classNames('multi-select', quizAnswerStatus, layout)}>
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
                  <Image layout="fill" objectFit="contain" src={item.iconUrl} />
                </span>
              )}
              <div className="text">
                <span className="label">{item.label}</span>
                {item.description && (
                  <Popover
                    content={item.description}
                    overlayClassName="popover-md"
                  >
                    <QuestionCircleOutlined />
                  </Popover>
                )}
              </div>
            </span>
          </Checkbox>
        ))}
      </Checkbox.Group>
    </span>
  )
}
