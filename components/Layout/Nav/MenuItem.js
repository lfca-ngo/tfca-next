import { Badge, Drawer, Menu, Popover } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { INVITE_STATUS, PERSONAL_SCORE, TOGGLE_Q_AND_A } from '../../../utils'
import { textBlockToString } from '../../../utils'
import { MenuSection, QuestionAnswer } from '../../Elements'

export const MenuItem = ({ link, ...props }) => {
  const [qaVisible, setQaVisible] = useState(false)
  const customization = useCustomization()
  const questionsString = textBlockToString(
    useContentBlocks('menu.section.questions')
  )

  switch (link.action) {
    case PERSONAL_SCORE:
      // @TODO: replace with check for team or always show
      return (
        <Menu.Item className="score" key={PERSONAL_SCORE} {...props}>
          <Popover content="Your current score">
            <Badge count={2} /> Your score
          </Popover>
        </Menu.Item>
      )
    case INVITE_STATUS:
      return customization?.sender ? (
        <Menu.Item className="invite-status" key={INVITE_STATUS} {...props}>
          Invited by {customization?.sender}
        </Menu.Item>
      ) : null
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
