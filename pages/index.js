import { Typography } from 'antd'
import React from 'react'

import IconArrowLeft from '../assets/icons/arrow-left.svg'
import { fetchContent } from '../services/contentful'

const { Title } = Typography

export default function Home() {
  return (
    <div className="container">
      <Title>h1. Ant Design</Title>
    </div>
  )
}
