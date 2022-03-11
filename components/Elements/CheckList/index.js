require('./styles.less')

import { CheckOutlined } from '@ant-design/icons'
import React from 'react'

import { Text } from '../../../utils/Text'

const CheckList = ({ data, limit }) => {
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
              <Text block={el?.value} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CheckList
