import { Button, Col, Form, Row } from 'antd'
import React, { useMemo } from 'react'

import { checkAnswers, transformOption } from '../../../utils'
import { Text, text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
import Category from '../helpers/Category'

const Question = ({ activeQuestion, blocks, name, store }) => {
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
    console.log(correctAnswers, selectedAnswers, isCorrect)
    // setStore({ ...store, [filterOption?.fieldName]: value })
    // setProgress(0.3)
    // goTo('results', { smooth: true })
  }

  return (
    <div className="step">
      <Category title={text(blocks['category.title'])} type={name} />
      <h2>{activeQuestion.question}</h2>

      <Form initialValues={store} layout="vertical" onFinish={handleNext}>
        <Form.Item label="Choose 1 option" name={activeQuestion?.questionId}>
          <MultiSelect items={answers?.options} singleMode />
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
