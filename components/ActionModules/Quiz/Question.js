import { Button, Form } from 'antd'
import React, { useMemo, useState } from 'react'

import { useContentBlocks } from '../../../hooks'
import { checkAnswers, SINGLE, transformOption } from '../../../utils'
import { text } from '../../../utils/Text'
import { GameProgress } from '../../Elements/GameProgress'
import { SelectFilter } from '../../Elements/SelectFilter'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

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
          activeQuestion?.number === 1 ? null : (
            <GameProgress
              answers={store?.answers}
              questionNumber={activeQuestion?.number}
              totalQuestionCount={quizLength}
            />
          )
        }
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon.url}
        title={text(blocks['category.title'])}
      />

      <StepHeader title={activeQuestion.question} />

      <Form initialValues={store} layout="vertical" onFinish={handleNext}>
        <Form.Item
          label={isSingleMode ? labelSingleMode : labelMultiMode}
          name={activeQuestion?.questionId}
          validateStatus={status}
        >
          <SelectFilter
            filterMode="radio-single"
            items={answers?.options}
            onSelect={() => setStatus(null)}
            quizAnswerStatus={status}
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
