import { Button } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import { PoliticianDetails } from '../../Elements/DetailViews'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Details = ({ blocks, goTo, icon, nextKey, prevKey, store }) => {
  const messagesValueKey = store[store.messagesFilterKey]
  const messages =
    store.messagesByFilterValue[
      Array.isArray(messagesValueKey) ? messagesValueKey[0] : messagesValueKey
    ]

  const item = store?.selectedItem || {}

  return (
    <div className="step">
      <Category
        goBack
        icon={icon}
        prev={() => goTo(prevKey)}
        title={text(blocks['details.title'])}
      />

      <StepHeader
        subtitle={blocks['details.subtitle']}
        title={blocks['details.title']}
        vars={{
          name: item.name || '',
        }}
      />

      <PoliticianDetails
        initialMessage={text(messages[0].text, { name: item.name })}
        item={item}
        messageSubject={text(messages[0].subject, {
          name: item.name,
        })}
        onFinish={() => goTo(nextKey)}
      />

      <Button
        block
        className="mt-30"
        onClick={() => goTo(nextKey)}
        size="large"
        type="primary"
      >
        Make it count
      </Button>
    </div>
  )
}
