require('./toolDetails.less')

import { PlusCircleOutlined } from '@ant-design/icons'
import { Divider } from 'antd'
import Image from 'next/image'
import React from 'react'

import { textBlockToString } from '../../../utils'
import { CallToAction } from '../CallToAction'
import { ListSection, TextSection } from '../Sections'

export const ToolDetails = ({ blocks, item, onNext }) => {
  return (
    <div className="detail-view tool">
      <header>
        <div className="logo-wrapper">
          <Image layout="fill" objectFit="contain" src={item.logo?.url} />
        </div>
        <div className="content">
          <div className="name">{item.name}</div>
          <div className="title">{item.title}</div>
          <Divider />
          <div className="actions">
            {item?.actions?.map((action, i) => (
              <CallToAction
                data-testid="tool-details-cta-btn"
                key={`action-${i}`}
                onCountMeIn={onNext}
                showLeaveModal
                {...action}
              />
            ))}
          </div>
        </div>
      </header>

      <main>
        <ListSection
          items={item?.benefits}
          title={textBlockToString(blocks['label.benefits'])}
        />

        <div>
          <div className="section-title title">
            <PlusCircleOutlined />
            {textBlockToString(blocks['label.howitworks'])}
          </div>
          <div className="screen">
            <Image
              height={360}
              layout="responsive"
              objectFit="contain"
              src={item.hero?.url}
              width={665}
            />
          </div>
        </div>

        <TextSection
          text={item?.description}
          title={textBlockToString(blocks['label.about'])}
        />
      </main>
    </div>
  )
}
