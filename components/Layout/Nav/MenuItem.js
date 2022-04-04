import { Button, Drawer } from 'antd'
import Link from 'next/link'
import React from 'react'

import { QuestionAnswer } from '../../Elements/QuestionAnswer'

export const MenuItem = ({ link }) => {
  const [qaVisible, setQaVisible] = useState(false)

  switch (link.action) {
    case TOGGLE_Q_AND_A:
      return (
        <li key="qa">
          <Button
            className="no-padding"
            onClick={() => setQaVisible(true)}
            type="link"
          >
            {link?.title}
          </Button>
          <Drawer
            className="drawer-md"
            onClose={() => setQaVisible(!qaVisible)}
            visible={qaVisible}
          >
            <QuestionAnswer />
          </Drawer>
        </li>
      )
    default:
      return (
        <li key={`link-${link.slug}`}>
          <Link href={link.slug || link.url || '/'}>{link.title}</Link>
        </li>
      )
  }
}
