require('./bankDetails.less')

import {
  CheckOutlined,
  PlusCircleOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import { Button, Divider, List, Space } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'

import { Text, text } from '../../../utils/Text'
import { LeavePage } from '../../ActionModules/helpers/LeavePage'
import { BasicModal } from '../BasicModal'

export const BankDetails = ({ item, onNext }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="detail-view bank">
      <header>
        <div className="logo">
          <div className="logo-wrapper">
            <Image height={175} src={item?.logo?.url} width={331} />
          </div>
        </div>

        <div className="tags">
          {item.tagsCollection?.items?.map((tag, i) => (
            <div className="tag-wrapper" key={`tag-${i}`}>
              <Image height={28} src={tag?.icon?.url} width={49} />
            </div>
          ))}
        </div>

        <div className="actions">
          <Space align="center">
            <Button
              block
              onClick={() => setVisible(true)}
              shape="round"
              type="primary"
            >
              Switch now
            </Button>
            <Button
              block
              icon={<ShareAltOutlined />}
              shape="round"
              type="primary"
            />
          </Space>
        </div>
      </header>

      <Divider />

      <div className="benefits">
        <div className="section-title title">
          <PlusCircleOutlined />
          Benefits
        </div>

        <List
          className="simple-list"
          dataSource={item?.benefitsCollection?.items}
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

      <div className="sustainability">
        <div className="section-title title">
          <PlusCircleOutlined />
          Sustainability
        </div>

        <List
          className="simple-list"
          dataSource={item?.sustainabilityCollection?.items}
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

      <div className="sustainability">
        <div className="section-title title">
          <PlusCircleOutlined />
          About {item?.name}
        </div>
        <div className="description">
          <Text block={item?.description} />
        </div>
      </div>

      <BasicModal
        content={
          <LeavePage
            destination={item.name}
            destinationUrl={item.referralUrl}
            onNext={onNext}
          />
        }
        setVisible={setVisible}
        title={null}
        visible={visible}
      />
    </div>
  )
}
