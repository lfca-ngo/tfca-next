import { Collapse } from 'antd'
import React from 'react'

import { useContentLists } from '../../../hooks'
import { Text } from '../../../utils/Text'

const { Panel } = Collapse

export const QuestionAnswer = () => {
  const faqContent = useContentLists('faq.general')?.items || []
  return (
    <Collapse accordion>
      {faqContent.map((faq, index) => (
        <Panel header={faq.question} key={index}>
          <Text block={faq.answer} />
        </Panel>
      ))}
    </Collapse>
  )
}
