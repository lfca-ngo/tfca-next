import { Button } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import { PoliticianDetails } from '../../Elements/DetailViews'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Details = ({ blocks, goTo, icon, nextKey, prevKey, store }) => {
  const message = store.topic.messages[0]

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
          name: store.item?.name || '',
        }}
      />

      <PoliticianDetails
        initialMessage={text(message.text, { name: store.item.name })}
        item={store.item}
        messageSubject={text(message.subject, {
          name: store.item.name,
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
