import { Button, Col, Form, Row } from 'antd'
import React, { useMemo, useState } from 'react'

import { checkAnswers, transformOption } from '../../../utils'
import { Text, text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
import Category from '../helpers/Category'

const Question = ({
  activeQuestion,
  blocks,
  goTo,
  icon,
  name,
  nextKey,
  store,
}) => {
  const [status, setStatus] = useState()

  const answers = useMemo(() => {
    const correctAnswers = []
    const answerOptions = activeQuestion?.answersCollection?.items?.map(
      (item) => {
        if (item.isCorrect) correctAnswers.push(item.key)
        return transformOption(item, item.key)
      }
    )
    return {
      correctAnswers,
      options: answerOptions,
    }
  }, [activeQuestion])

  const handleNext = (v) => {
    const correctAnswers = answers?.correctAnswers
    const selectedAnswers = v[activeQuestion?.questionId]
    const isCorrect = checkAnswers(correctAnswers, selectedAnswers)

    if (!isCorrect) return setStatus('error')
    goTo(nextKey)
  }

  return (
    <div className="step">
      <Category icon={icon} title={text(blocks['category.title'])} />
      <h2>{activeQuestion.question}</h2>

      <Form initialValues={store} layout="vertical" onFinish={handleNext}>
        <Form.Item
          help="Upps you are wrong!"
          label="Choose 1 option"
          name={activeQuestion?.questionId}
          validateStatus={status}
        >
          <MultiSelect
            items={answers?.options}
            onSelect={() => setStatus(null)}
            singleMode
          />
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

export default Question
