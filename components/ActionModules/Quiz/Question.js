import { Button, Form } from 'antd'
import React, { useMemo, useState } from 'react'

import { useContentBlocks } from '../../../hooks'
import { checkAnswers, SINGLE, transformOption } from '../../../utils'
import { text } from '../../../utils/Text'
import { SelectFilter } from '../../Elements/SelectFilter'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Question = ({
  activeQuestion,
  goTo,
  module: { blocks = {}, icon = {} },
  nextKey,
  prevKey,
  store,
}) => {
  const [status, setStatus] = useState()
  const isSingleMode = activeQuestion?.inputType === SINGLE
  const labelSingleMode = text(useContentBlocks('label.singlemode'))
  const labelMultiMode = text(useContentBlocks('label.multimode'))

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
      <Category
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon.url}
        title={text(blocks['category.title'])}
      />

      <StepHeader title={activeQuestion.question} />

      <Form initialValues={store} layout="vertical" onFinish={handleNext}>
        <Form.Item
          help={status === 'error' && 'Upps you are wrong!'}
          label={isSingleMode ? labelSingleMode : labelMultiMode}
          name={activeQuestion?.questionId}
          validateStatus={status}
        >
          <SelectFilter
            filterMode="radio-single"
            items={answers?.options}
            onSelect={() => setStatus(null)}
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
