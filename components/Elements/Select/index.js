require('./styles.less')

import { Select as AntdSelect } from 'antd'
import Image from 'next/image'
import React from 'react'

export const Select = ({ items = [], mode, ...props }) => {
  return (
    <AntdSelect mode={mode} {...props}>
      {items.map((option) => {
        const iconUrl = option.iconUrl || option?.icon?.url
        const customValue =
          option.type === 'number' ? option.valueNumber : option.valueString
        const value = customValue || option.value
        return (
          <AntdSelect.Option key={value} value={value}>
            <span className="option-with-icon">
              {iconUrl && <Image height={32} src={iconUrl} width={32} />}
              <span className="option-label">{option.label}</span>
            </span>
          </AntdSelect.Option>
        )
      })}
    </AntdSelect>
  )
}
