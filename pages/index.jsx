import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { Button, Divider, Icon, Space, Typography } from 'antd'
import React from 'react'

import IconArrowLeft from '../assets/icons/arrow-left.svg'
import { useContent } from '../services/contentful'

const { Title } = Typography

export default function Home() {
  const { data, loading } = useContent()

  return (
    <div className="container">
      <Title>h1. Ant Design</Title>
    </div>
  )
}
