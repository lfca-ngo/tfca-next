import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
import Category from '../ActionWrapper/Category'

const JOB_TYPES = [
  {
    iconUrl:
      'https://images.ctfassets.net/f3bw2oxveb3i/4PZbes4aWFqxkVyLaWb0vo/0256b0f5743726a3670d7c2fd28c0a2b/aubergine.svg',
    label: 'Product & Design',
    value: 'product-design',
  },
  {
    iconUrl:
      'https://images.ctfassets.net/f3bw2oxveb3i/4PZbes4aWFqxkVyLaWb0vo/0256b0f5743726a3670d7c2fd28c0a2b/aubergine.svg',
    label: 'Development',
    value: 'dev',
  },
  {
    iconUrl:
      'https://images.ctfassets.net/f3bw2oxveb3i/4PZbes4aWFqxkVyLaWb0vo/0256b0f5743726a3670d7c2fd28c0a2b/aubergine.svg',
    label: 'Sustainability',
    value: 'sus',
  },
  {
    iconUrl:
      'https://images.ctfassets.net/f3bw2oxveb3i/4PZbes4aWFqxkVyLaWb0vo/0256b0f5743726a3670d7c2fd28c0a2b/aubergine.svg',
    label: 'Other',
    value: 'other',
  },
]

const Intro = (props) => {
  const handleNext = (v) => {
    console.log(v)
    props.setProgress(0.3)
    props.goTo('results', { smooth: true })
  }

  return (
    <div className="step">
      <Category
        title={text(props.blocks['category.title'])}
        type={props.name}
      />
      <h2>{text(props.blocks['intro.title'])}</h2>

      <Form layout="vertical" onFinish={handleNext}>
        <Form.Item label="Choose 1 option" name="job-type">
          <MultiSelect items={JOB_TYPES} singleMode />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" size="large" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Intro
