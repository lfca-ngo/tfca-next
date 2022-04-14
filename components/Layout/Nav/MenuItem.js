import { Drawer, Menu } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

import { useContentBlocks } from '../../../hooks'
import { TOGGLE_Q_AND_A } from '../../../utils'
import { textBlockToString } from '../../../utils'
import { MenuSection, QuestionAnswer } from '../../Elements'

export const MenuItem = ({ link, ...props }) => {
  const [qaVisible, setQaVisible] = useState(false)
  const questionsString = textBlockToString(
    useContentBlocks('menu.section.questions')
  )

  switch (link.action) {
    case TOGGLE_Q_AND_A:
      return (
        <Menu.Item key="qa" {...props}>
          <span onClick={() => setQaVisible(!qaVisible)}>{link?.title}</span>

          <Drawer
            className="drawer-md"
            onClose={() => setQaVisible(!qaVisible)}
            visible={qaVisible}
          >
            <MenuSection content={<QuestionAnswer />} title={questionsString} />
          </Drawer>
        </Menu.Item>
      )
    default:
      return (
        <Menu.Item key={`link-${link.slug}`} {...props}>
          <Link href={link.slug || link.url || '/'}>{link.title}</Link>
        </Menu.Item>
      )
  }
}
