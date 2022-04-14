import { Button, Form } from 'antd'
import React, { useMemo, useState } from 'react'

import { useContentBlocks } from '../../../hooks'
import {
  checkAnswers,
  SINGLE,
  textBlockToString,
  transformOption,
} from '../../../utils'
import {
  Category,
  GameProgress,
  SELECT_ALL,
  SelectFilter,
  StepHeader,
} from '../../Elements'

export const Question = ({
  activeQuestion,
  goTo,
  module: { blocks = {}, icon = {} },
  nextKey,
  prevKey,
  quizLength,
  store,
  setStore,
}) => {
  const [status, setStatus] = useState()
  const isSingleMode = activeQuestion?.inputType.indexOf(SINGLE) > -1
  const labelSingleMode = textBlockToString(
    useContentBlocks('label.singlemode')
  )
  const labelMultiMode = textBlockToString(useContentBlocks('label.multimode'))

  const answers = useMemo(() => {
    const correctAnswers = []
    const answerOptions = activeQuestion?.answers?.map((item) => {
      if (item.isCorrect) correctAnswers.push(item.key)
      return transformOption(item, item.key, { isCorrect: item.isCorrect })
    })
    return {
      correctAnswers,
      options: answerOptions,
    }
  }, [activeQuestion])

  const handleNext = (v) => {
    const correctAnswers = answers?.correctAnswers
    const selectedAnswers = v[activeQuestion?.questionId]
    const withoutSelectAll = selectedAnswers.filter((i) => i !== SELECT_ALL)
    const isCorrect = checkAnswers(correctAnswers, withoutSelectAll)
    // save if it was correct in the answers in store
    setStore({
      ...store,
      answers: { ...store.answers, [activeQuestion?.questionId]: isCorrect },
    })

    if (!isCorrect) setStatus('error')
    else setStatus('success')

    // wait shortly and continue
    setTimeout(() => goTo(nextKey), 600)
  }

  return (
    <div className="step">
      <Category
        addOn={
          <GameProgress
            answers={store?.answers}
            questionNumber={activeQuestion?.number}
            totalQuestionCount={quizLength}
          />
        }
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon.url}
        title={textBlockToString(blocks['category.title'])}
      />

      <StepHeader
        subtitle={activeQuestion.hint}
        title={activeQuestion.question}
      />

      <Form initialValues={store} layout="vertical" onFinish={handleNext}>
        <Form.Item
          label={isSingleMode ? labelSingleMode : labelMultiMode}
          name={activeQuestion?.questionId}
          validateStatus={status}
        >
          <SelectFilter
            enableSelectAll={activeQuestion?.enableSelectAll}
            filterMode={activeQuestion?.inputType}
            items={answers?.options}
            onSelect={() => setStatus(null)}
            quizAnswerStatus={status}
          />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" size="large" type="primary">
            {textBlockToString(blocks['question.button.primary'])}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
