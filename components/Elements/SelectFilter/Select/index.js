require('./styles.less')

import { Select as AntdSelect } from 'antd'
import Image from 'next/image'
import React from 'react'

export const Select = ({ items = [], mode, ...props }) => {
  return (
    <AntdSelect
      className="select-filter-select"
      mode={mode}
      {...props}
      getPopupContainer={() => document.getElementById('scroll-container')}
    >
      {items.map((option) => (
        <AntdSelect key={option.value} value={option.value}>
          <span className="option-with-icon">
            {option.iconUrl && (
              <Image height={32} src={option.iconUrl} width={32} />
            )}
            <span className="option-label">{option.label}</span>
          </span>
        </AntdSelect>
      ))}
    </AntdSelect>
  )
}
