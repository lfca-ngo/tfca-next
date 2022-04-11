require('./styles.less')

import { CheckOutlined } from '@ant-design/icons'
import React from 'react'

import { Text } from '../Text'

export const CheckList = ({ data, limit, vars }) => {
  if (!data) return null

  let listData = data
  if (limit) {
    listData = data.slice(0, limit)
  }

  return (
    <div className="check-list">
      {listData.map((el, i) => {
        return (
          <div className="list-elem" key={`el-${i}`}>
            <CheckOutlined />
            <div className="desc">
              <Text block={el?.value} vars={vars} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
