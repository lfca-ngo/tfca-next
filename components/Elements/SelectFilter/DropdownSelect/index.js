require('./styles.less')

import { CheckOutlined, DownCircleOutlined } from '@ant-design/icons'
import { Badge, Button, Dropdown, Menu } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'

export const DropdownSelect = ({
  value = [],
  onChange,
  items = [],
  singleMode,
  onSelect,
  placeholder = 'Please select',
}) => {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(value)
  const isEmpty = selected.length === 0
  const hasSingleSelectedItem = selected.length === 1
  const [firstItem] = selected
  const firstItemContent = firstItem && items.find((i) => i.value === firstItem)
  const firstItemLabel = firstItemContent?.label || firstItem

  const triggerChange = (changedValue) => {
    onChange?.(changedValue)
  }

  const onItemSelect = ({ key }) => {
    let newSelected = selected.includes(key)
      ? selected.filter((v) => v !== key)
      : [...selected, key]

    if (singleMode) newSelected = [key]

    setSelected(newSelected)
    onSelect && onSelect(newSelected)
    triggerChange(newSelected)
  }

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
        icon={<DownCircleOutlined />}
        size="small"
      >
        {isEmpty ? (
          placeholder
        ) : hasSingleSelectedItem ? (
          firstItemLabel
        ) : (
          <span>
            Multiple <Badge count={selected.length} />
          </span>
        )}
      </Button>
    </Dropdown>
  )
}
