import { Modal, Tabs } from 'antd'
import React, { useContext, useState } from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import useFlow from '../../../hooks/useFlow'
import Calculate from './Calculate'
import CheckProvider from './CheckProvider'
import FormSwitch from './FormSwitch'
import Intro from './Intro'
import Results from './Results'
import Success from './Success'

const { TabPane } = Tabs

const steps = {
  calculate: (props) => <Calculate {...props} />,
  check: (props) => <CheckProvider {...props} />,
  form: (props) => <FormSwitch {...props} />,
  intro: (props) => <Intro {...props} />,
  results: (props) => <Results {...props} />,
  success: (props) => <Success {...props} />,
}

const SwitchEnergyFlow = (props) => {
  const { goTo, index, setVisible, visible } = useFlow({
    initial: 'intro',
    name: props.name,
  })

  const [postcode, setPostcode] = useState()
  const [energyKwh, setEnergyKwh] = useState(0)
  const { customization, setProgress } = useChallenge()

  const handleFinish = () => {
    setVisible(true)
  }

  return (
    <div className="action">
      <div className="steps-container">
        <Tabs
          activeKey={index}
          animated={{ inkBar: false, tabPane: true }}
          destroyInactiveTabPane
          renderTabBar={() => null}
        >
          {Object.keys(steps).map((key) => {
            const Page = steps[key]
            return (
              <TabPane key={key} tab={`${props.name}`}>
                <Page
                  blocks={props.module?.blocks || {}}
                  customization={customization}
                  energyKwh={energyKwh}
                  goTo={goTo}
                  lists={props.module?.lists || {}}
                  name={props.name}
                  onFinish={handleFinish}
                  postcode={postcode}
                  setEnergyKwh={setEnergyKwh}
                  setPostcode={setPostcode}
                  setProgress={setProgress}
                  setShowConfetti={props.setShowConfetti}
                  stepRef={props.stepRef}
                />
              </TabPane>
            )
          })}
        </Tabs>
        {/* Sharing Dialog */}
        <Modal
          footer={null}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
          visible={visible}
          wrapClassName={`modal-md ${props.color} has-top`}
        >
          <h1>Danke!</h1>
          <p>
            Leider kannst du diese Website noch nicht mit deinen Freunden
            teilen. Natürlich könntest du den Link copy & pasten aber wir bitten
            dich das (noch) nicht zu tun!
          </p>
          <p>
            Wir bereiten eine große Kampagne für den Earth Day '22 vor und du
            hast uns mit diesem Testlauf sehr geholfen. Einige der Prozesse auf
            der Website laufen noch manuell und einen Ansturm könnten wir
            aktuell noch nicht handlen.
          </p>
          <h4>Fragen?</h4>
          Schreib uns eine Email an{' '}
          <a href="mailto:timo@lfca.earth">timo@lfca.earth</a>
        </Modal>
      </div>
    </div>
  )
}

export default SwitchEnergyFlow
