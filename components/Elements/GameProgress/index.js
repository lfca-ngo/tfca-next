require('./styles.less')

import { LikeOutlined, QuestionOutlined } from '@ant-design/icons'
import { Divider, Popover } from 'antd'
import React from 'react'

const GameProgressInner = ({ content, icon, popoverContent = '' }) => (
  <div className="game-progress-inner">
    <Popover content={popoverContent}>
      <div className="icon-wrapper">{icon}</div>
    </Popover>

    <span>{content}</span>
  </div>
)

export const GameProgress = ({
  count,
  questionNumber = 0,
  totalQuestionCount = 0,
}) => (
  <div className="game-progress">
    <GameProgressInner
      content={`${questionNumber} / ${totalQuestionCount}`}
      icon={<QuestionOutlined />}
      popoverContent={`Question ${questionNumber} of ${totalQuestionCount}`}
    />
    <Divider type="vertical" />
    <GameProgressInner
      content={count}
      icon={<LikeOutlined />}
      popoverContent={`Amount of correct answers`}
    />
  </div>
)
