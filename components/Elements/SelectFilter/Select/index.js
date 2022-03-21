import { Select as AntdSelect } from 'antd'
import Image from 'next/image'
import React from 'react'

export const Select = ({ items = [], mode, ...props }) => {
  return (
    <AntdSelect mode={mode} {...props}>
      {items.map((option) => (
        <AntdSelect.Option key={option.value} value={option.value}>
          <span className="option-with-icon">
            {option.iconUrl && (
              <Image height={32} src={option.iconUrl} width={32} />
            )}
            <span className="option-label">{option.label}</span>
          </span>
        </AntdSelect.Option>
      ))}
    </AntdSelect>
  )
}
