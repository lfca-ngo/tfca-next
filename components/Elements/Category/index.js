require('./styles.less')

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'

import { useContentBlocks } from '../../../hooks'
import { textBlockToString } from '../../../utils'

export const Category = ({ addOn, goBack, icon, title }) => {
  const backString = useContentBlocks('nav.back')

  return (
    <div className="action-category">
      <div className="content">
        {goBack ? (
          <Button onClick={goBack} type="link">
            <ArrowLeftOutlined /> {textBlockToString(backString)}
          </Button>
        ) : (
          <>
            <div className="icon">
              <Image height={22} layout="fixed" src={icon} width={22} />
            </div>
            <div className="text">{title}</div>
          </>
        )}
      </div>
      {addOn && <div className="add-on">{addOn}</div>}
    </div>
  )
}
