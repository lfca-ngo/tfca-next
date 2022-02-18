import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useMemo } from 'react'

// import useContentfulBlock from '../../hooks/useContentfulBlock'
// import CustomIcon from '../../utils/CustomIcon'

const Category = (props) => {
  const backString = 'back' //useContentfulBlock('nav.back')
  if (props.goBack) {
    return (
      <div className="action-category">
        <Button onClick={props.prev} type="link">
          <ArrowLeftOutlined /> {backString}
        </Button>
      </div>
    )
  }
  return (
    <div className="action-category">
      <span className="icon-wrapper">
        Icon
        {/* <CustomIcon name={props.type} /> */}
      </span>
      {props.title}
    </div>
  )
}

export default Category
