import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

import { useContentBlocks } from '../../../hooks'
import { text } from '../../../utils/Text'

const Category = ({ goBack, icon, title }) => {
  const backString = useContentBlocks('nav.back')
  if (goBack) {
    return (
      <div className="action-category">
        <Button onClick={goBack} type="link">
          <ArrowLeftOutlined /> {text(backString)}
        </Button>
      </div>
    )
  }
  return (
    <div className="action-category">
      <div className="icon">
        <img src={icon} />
      </div>
      <div className="text">{title}</div>
    </div>
  )
}

export default Category
