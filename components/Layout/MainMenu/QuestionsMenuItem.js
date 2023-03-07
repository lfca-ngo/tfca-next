import { Drawer } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'

import { useContentBlocks } from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { QuestionAnswer } from '../../Elements'

export const QuestionsMenuItem = ({ className, title }) => {
  const menuTitle = useContentBlocks('menu.section.questions')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className={classNames('menu-item', className)}>
      <a onClick={() => setIsOpen(!isOpen)}>{title}</a>

      <Drawer
        className="drawer-md"
        onClose={() => setIsOpen(!isOpen)}
        visible={isOpen}
      >
        <h3>{textBlockToString(menuTitle)}</h3>
        <QuestionAnswer />
      </Drawer>
    </li>
  )
}
