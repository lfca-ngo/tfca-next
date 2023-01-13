import { Badge, Drawer, Popover } from 'antd'
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
        <li className="menu-item score" key={PERSONAL_SCORE}>
          <Popover content="Your current score">
            <Badge count={2} /> Your score
          </Popover>
        </li>
      )
    case INVITE_STATUS:
      return customization?.sender ? (
        <li className="menu-item invite-status" key={INVITE_STATUS}>
          Invited by {customization?.sender}
        </li>
      ) : null
    case TOGGLE_Q_AND_A:
      return (
        <li className="menu-item" key="qa">
          <span onClick={() => setQaVisible(!qaVisible)}>{link?.title}</span>

          <Drawer
            className="drawer-md"
            onClose={() => setQaVisible(!qaVisible)}
            visible={qaVisible}
          >
            <MenuSection content={<QuestionAnswer />} title={questionsString} />
          </Drawer>
        </li>
      )
    default:
      return (
        <li className="menu-item" key={`link-${link.slug}`}>
          <Link href={link.slug || link.url || '/'}>{link.title}</Link>
        </li>
      )
  }
}
