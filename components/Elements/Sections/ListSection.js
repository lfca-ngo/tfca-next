import { CheckOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { List } from 'antd'
import React from 'react'

import { text } from '../../../utils/text'

export const ListSection = ({ items, listIcon, title, titleIcon }) => {
  return (
    <div className="list-section">
      <div className="section-title title">
        {titleIcon || <PlusCircleOutlined />}
        {title}
      </div>

      <List
        className="simple-list"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={listIcon || <CheckOutlined />}
              description={text(item.value)}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
