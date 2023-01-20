import { Badge, Drawer, Popover } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import {
  COMPANY_INFO,
  INTL_SELECTOR,
  INVITE_STATUS,
  PERSONAL_SCORE,
  TOGGLE_Q_AND_A,
} from '../../../utils'
import { textBlockToString } from '../../../utils'
import { MenuSection, QuestionAnswer } from '../../Elements'
import { IntlSelector } from '../../IntlSelector'

export const MenuItem = ({ link }) => {
  const [qaVisible, setQaVisible] = useState(false)
  const { query } = useRouter()
  const isTeam = !!query.team
  const customization = useCustomization()
  const questionsString = textBlockToString(
    useContentBlocks('menu.section.questions')
  )

  switch (link.action) {
    case PERSONAL_SCORE:
      return !isTeam ? null : (
        <li className="menu-item score" key={PERSONAL_SCORE}>
          <Popover content="Your current score">
            <Badge count={2} />
          </Popover>
          {link?.title}
        </li>
      )
    case COMPANY_INFO:
      return customization?.sender ? (
        <li className="menu-item" key={COMPANY_INFO}>
          {link?.title}
        </li>
      ) : null
    case INTL_SELECTOR:
      return (
        <li className="menu-item " key={INTL_SELECTOR}>
          <IntlSelector />
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
