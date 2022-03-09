require('./styles.less')

import { Select as AntdSelect } from 'antd'
const { Option } = AntdSelect

import Image from 'next/image'
import React from 'react'

export const Select = ({
  items = [],
  onChange,
  placeholder = '',
  loading,
  value,
}) => {
  return (
    <span className="select">
      <AntdSelect
        dropdownClassName="select-dropdown"
        filterOption={(input, option) => {
          const text = getNodeText(option)
          return text.toUpperCase().indexOf(input.toUpperCase()) >= 0
        }}
        getPopupContainer={() => document.getElementById('scroll-container')}
        loading={loading}
        onChange={onChange}
        optionFilterProp="children"
        placeholder={placeholder}
        showSearch
        value={value}
      >
        {items.map((item) => (
          <Option key={item.value} value={item.value}>
            <span className="label-wrapper">
              {item.iconUrl && (
                <span className="icon">
                  <Image height={25} src={item.iconUrl} width={25} />
                </span>
              )}
              {item.label}
            </span>
          </Option>
        ))}
      </AntdSelect>
    </span>
  )
}

function getNodeText(node) {
  if (['string', 'number'].includes(typeof node)) return node
  if (node instanceof Array) return node.map(getNodeText).join('')
  if (typeof node === 'object' && node) return getNodeText(node.props.children)
}
