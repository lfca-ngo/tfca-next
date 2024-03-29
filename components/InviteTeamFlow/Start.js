import { Button, Collapse, Space } from 'antd'
import React from 'react'

const { Panel } = Collapse

const VIDEO_URL =
  'https://res.cloudinary.com/dhpk1grmy/video/upload/v1680698830/TFCA%20Campaign/howto_me33ze.mp4'

export const Start = ({ goBack, goNext }) => {
  return (
    <div className="leaderboard-explainer">
      <h1>You are ready to go! 🚀</h1>
      <p style={{ margin: '0 0 40px' }}>
        {`Once you click on "Start the challenge", you will get to the campaign
        page, where you can take meaningful climate action and invite your
        friends and family to do the same. For every action that you complete
        and for every invite that you sent, you will get points and climb up the leaderboard of
        your team. The team member with the most points wins the challenge!`}
      </p>

      <Collapse>
        <Panel header="How do I check the leaderboard?" key="1">
          <p>Use the link in the menu to check the leaderboard of your team.</p>
          <div className="video-container">
            <video autoPlay loop muted>
              {/* add video source */}
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
          </div>
        </Panel>
        <Panel header="How do I invite other users?" key="2">
          <p>
            {`You can invite users either by clicking on "Share" in the menu, by
            using the floating button on the homescreen or by using the dialog
            that pops up after completing an action.`}
          </p>
        </Panel>
        <Panel header="How do I claim rewards?" key="3">
          <p>
            {`Your company might offer rewards or prizes for the users who create
            the biggest impact through the challenge. To claim your reward,
            reach out to your company's challenge organizer at the end of the
            challenge with your login key and username.`}
          </p>
        </Panel>
      </Collapse>

      <div className="actions">
        <Space>
          <Button onClick={goNext} size="large" type="primary">
            Start the challenge
          </Button>
          <Button onClick={goBack} size="large">
            Back
          </Button>
        </Space>
      </div>
    </div>
  )
}
