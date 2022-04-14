require('./styles.less')

import { QuestionCircleOutlined } from '@ant-design/icons'
import { Checkbox, Popover } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'

import { useContentBlocks } from '../../../hooks'
import { textBlockToString } from '../../../utils'

export const SELECT_ALL = 'SELECT_ALL'

const CustomCheckbox = ({ item }) => {
  return (
    <Checkbox
      className={classNames({ correct: item.isCorrect })}
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
            <Popover content={item.description} overlayClassName="popover-md">
              <QuestionCircleOutlined />
            </Popover>
          )}
        </div>
      </span>
    </Checkbox>
  )
}

export const Radio = ({
  value = [],
  onChange,
  items = [],
  singleMode,
  onSelect,
  quizAnswerStatus,
  layout,
  enableSelectAll,
}) => {
  const [selected, setSelected] = useState(value)
  const allCorrect = items.every((i) => i.isCorrect)
  const selectAllString = textBlockToString(useContentBlocks('radio.selectall'))

  const triggerChange = (changedValue) => {
    onChange?.(changedValue)
  }

  const onCheckboxChange = (selectedValues) => {
    onSelect && onSelect(selectedValues)

    const [latestChange] = selectedValues.filter((v) => !selected.includes(v))
    const shouldSelectAll = latestChange === SELECT_ALL
    const allValues = [...items.map((item) => item.value), SELECT_ALL]
    const hasDeselected = !latestChange
    const newSelectedValues = hasDeselected
      ? selectedValues.filter((v) => v !== SELECT_ALL)
      : selectedValues

    let newValues = shouldSelectAll ? allValues : newSelectedValues
    // in single mode only one value can be selected
    if (singleMode) {
      // get the latest change by checking the difference to the state
      newValues = [latestChange]
    }

    setSelected(newValues)

    triggerChange(newValues)
  }

  return (
    <span className={classNames('multi-select', quizAnswerStatus, layout)}>
      <Checkbox.Group onChange={onCheckboxChange} value={selected}>
        {items.map((item, i) => (
          <CustomCheckbox item={item} key={`selected-${i}`} />
        ))}
        {enableSelectAll && (
          <CustomCheckbox
            item={{
              isCorrect: allCorrect,
              label: selectAllString,
              value: SELECT_ALL,
            }}
            key={SELECT_ALL}
          />
        )}
      </Checkbox.Group>
    </span>
  )
}
