import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

import { useBlocks } from '../../hooks/useTranslation'
import CustomIcon from '../../utils/CustomIcon'
import { Text } from '../../utils/Text'

const Category = (props) => {
  const backString = useBlocks('nav.back')
  if (props.goBack) {
    return (
      <div className="action-category">
        <Button onClick={props.prev} type="link">
          <ArrowLeftOutlined /> <Text block={backString} />
        </Button>
      </div>
    )
  }
  return (
    <div className="action-category">
      <span className="icon-wrapper">
        <CustomIcon name={props.type} />
      </span>
      {props.title}
    </div>
  )
}

export default Category
