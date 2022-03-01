import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

import { useBlocks } from '../../../hooks/useTranslation'
import { text } from '../../../utils/Text'

const Category = (props) => {
  const backString = useBlocks('nav.back')
  if (props.goBack) {
    return (
      <div className="action-category">
        <Button onClick={props.prev} type="link">
          <ArrowLeftOutlined /> {text(backString)}
        </Button>
      </div>
    )
  }
  return (
    <div className="action-category">
      <div className="icon">
        <img src={props.icon} />
      </div>
      <div className="text">{props.title}</div>
    </div>
  )
}

export default Category
