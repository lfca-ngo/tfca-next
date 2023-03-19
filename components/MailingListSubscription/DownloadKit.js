import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

const KIT_URL =
  'https://drive.google.com/drive/folders/1QctoeQqmnzb6wCV49LUXEKKr0MlrQ5fp?usp=sharing'

export const DownloadKit = () => {
  return (
    <a href={KIT_URL}>
      <Button block icon={<DownloadOutlined />} size="large" type="primary">
        Download
      </Button>
    </a>
  )
}
