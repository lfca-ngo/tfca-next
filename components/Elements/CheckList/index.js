require('./styles.less')

import Icon from '@ant-design/icons'
import React from 'react'

import IconCheck from '../../../assets/icons/g-check.svg'
import { Text } from '../../../utils/Text'

const CheckList = ({ data }) => {
  if (!data) return null

  return (
    <div className="check-list">
      {data.map((el, i) => {
        return (
          <div className="list-elem" key={`el-${i}`}>
            <Icon component={IconCheck} />
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
