require('./styles.less')

import { CheckOutlined, DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'

export const DropdownSelect = ({
  value = [],
  onChange,
  items = [],
  singleMode,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(value)
  const isEmpty = selected.length === 0
  const hasSingleSelectedItem = selected.length === 1
  const [firstItem] = selected

  const triggerChange = (changedValue) => {
    onChange?.(changedValue)
  }

  const onItemSelect = ({ key }) => {
    // add to internal state or remove if its already selected
    let newSelected = selected.includes(key)
      ? selected.filter((v) => v !== key)
      : [...selected, key]

    if (singleMode) {
      newSelected = [key]
    }

    setSelected(newSelected)
    onSelect && onSelect(newSelected)
    triggerChange(newSelected)
  }

  console.log('items', selected)

  const menu = (
    <Menu onClick={onItemSelect}>
      {items.map((item) => {
        const isActive = selected.includes(item.value)
        return (
          <Menu.Item icon={isActive && <CheckOutlined />} key={item.value}>
            {item.label}
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <Dropdown
      onVisibleChange={(flag) => setVisible(flag)}
      overlay={menu}
      overlayClassName="dropdown-select"
      trigger={['click']}
      visible={visible}
    >
      <Button
        className={classNames('dropdown-select-btn', { 'is-empty': isEmpty })}
        icon={<DownOutlined />}
      >
        {isEmpty ? 'Select' : hasSingleSelectedItem ? firstItem : 'Multiple'}
      </Button>
    </Dropdown>
  )
}
