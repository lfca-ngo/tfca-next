require('./actionDetails.less')

import {
  CheckOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import Icon from '@ant-design/icons'
import { Button, Col, List, Row, Tag } from 'antd'
import React from 'react'

import IconHow from '../../../assets/icons/how.svg'
import IconReasons from '../../../assets/icons/reasons.svg'
import { Text, text } from '../../../utils/Text'
import CallToAction from '../CallToAction'

export const ActionDetails = ({ item }) => {
  console.log(item)
  const levelTags =
    item.levelsCollection?.items?.map((level) => text(level.value)) || []
  const areaTags =
    item.areasCollection?.items?.map((level) => text(level.value)) || []
  const tagsTags =
    item.tagsCollection?.items?.map((level) => text(level.value)) || []
  return (
    <div className="action-detail-view">
      <div className="hero-image">
        <img src={item.hero?.url} />
      </div>

      <div className="header">
        <div className="title">{item.name}</div>
        <div className="actions">
          <Button icon={<ShareAltOutlined />} shape="round" type="primary" />
        </div>
      </div>

      <div className="short-description">{item?.shortDescription}</div>

      <div className="reasons">
        <div className="section-title title">
          <PlusCircleOutlined />
          Why do this?
        </div>

        <List
          className="simple-list white"
          dataSource={item?.reasonsCollection?.items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<CheckOutlined />}
                description={text(item.value)}
              />
            </List.Item>
          )}
        />
      </div>

      <div className="reasons">
        <div className="section-title title">
          <QuestionCircleOutlined />
          How to do this?
        </div>
        <Text block={item?.description} />
      </div>

      {item?.actionsCollection?.items?.map((action, i) => (
        <CallToAction key={`action-${i}`} {...action} />
      ))}

      <div className="tags">
        {levelTags?.map((tag, index) => (
          <Tag className="base-tag" color="gold" key={index}>
            {tag}
          </Tag>
        ))}
        {areaTags?.map((tag, index) => (
          <Tag className="base-tag" color="blue" key={index}>
            {tag}
          </Tag>
        ))}
        {tagsTags?.map((tag, index) => (
          <Tag className="base-tag" color="blue" key={index}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  )
}
