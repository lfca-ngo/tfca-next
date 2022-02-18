import { Modal, Tabs } from 'antd'
import React, { useContext, useState } from 'react'

import iconEuro from '../../../assets/icons/round-euro.svg'
import iconVerified from '../../../assets/icons/verified.svg'
import iconWorld from '../../../assets/icons/world.svg'
import { useChallenge } from '../../../hooks/useChallenge'
import useFlow from '../../../hooks/useFlow'
import Calculate from './Calculate'
import CheckProvider from './CheckProvider'
import FormSwitch from './FormSwitch'
import Intro from './Intro'
import Results from './Results'
import Success from './Success'

const { TabPane } = Tabs

const ARGS_NOW = (name) => [
  {
    text: `Dir ist der Klimawandel nicht egal, sonst hätte ${name} dich gar nicht eingeladen. Mit deinem Wechsel sparst du jährlich über eine Tonne CO2 und bringst die Energiewende wirklich voran`,
    icon: iconWorld,
  },
  {
    text: 'Wir haben alle deutschen Energieprovider mit 100% EE zusammengebracht, du bekommst also garantiert das beste Angebot und kannst direkt hier in der App wechseln',
    icon: iconVerified,
  },
  {
    text: 'Wenn du jetzt und hier wechselst, fließt die volle Provision (30€) noch zusätzlich in den Klimaschutz. Wenn nicht jetzt, wann dann?',
    icon: iconEuro,
  },
]

const ARGS_CALC = [
  {
    text: {
      childMarkdownRemark: {
        html: `<p>Die Ergebnisse und der Wechselservice kommen von <a href=''>wirklich-gruen.de</a>, einer gemeinnützigen Organisation</p>`,
      },
    },
  },
  {
    text: 'Alle Anbieter sind von RobinWood ausgezeichnet: 100% Erneuerbar, unabhängig und mit aktiver Finanzierung neuer Anlagen für die Energiewende',
  },
  {
    text: 'Bei den meisten Anbietern kannst du direkt hier in der App den Wechsel machen, Papierkram übernehmen wir!',
  },
  {
    text: 'Keine-Sorgen Garantie: Der Stromwechsel findet erst statt wenn dein alter Vertrag endet. Doppelzahlung ausgeschlossen! ',
  },
]

const steps = {
  intro: (props) => {
    let { customization, module, ...rest } = props
    module.stepIntroTitle = `${customization?.from} möchte wissen ob du für deinen Haushalt schon 100% Ökostrom nutzt?`
    module.stepIntroButtonSecondary = 'Ja, mach ich schon'
    module.stepIntroButtonSecondary = 'Ja, mach ich schon'
    module.stepIntroHint =
      'Fast 70% der deutschen Haushalte beziehen Strom bei ihrem Grundversorger und unterstützen damit oft unwissentlich Kohle & co. Dabei ist wechseln heute so leicht. Probier’s aus!'
    return <Intro {...rest} module={module} />
  },
  calculate: (props) => {
    let { customization, module, ...rest } = props
    module.stepCalculateTitle =
      'Super, jetzt ist der perfekte Zeitpunkt zu wechseln! Warum?'
    module.arguments = ARGS_NOW(customization?.from)
    return <Calculate {...rest} module={module} />
  },
  results: (props) => {
    let { module, ...rest } = props
    module.stepResultsTitle = 'Wunderbar! Hier sind alle Anbieter im Überblick'
    module.arguments = ARGS_CALC
    return <Results {...rest} module={module} />
  },
  form: (props) => <FormSwitch {...props} />,
  success: (props) => <Success {...props} />,
  check: (props) => <CheckProvider {...props} />,
}

const SwitchEnergyFlow = (props) => {
  const { goTo, index, setVisible, visible } = useFlow({
    name: props.name,
    initial: 'intro',
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
                  expand={props.expand}
                  goTo={goTo}
                  hideBar={props.hideBar}
                  lists={props.module?.lists || {}}
                  module={props.module}
                  name={props.name}
                  onFinish={handleFinish}
                  openDrawer={props.openDrawer}
                  postcode={postcode}
                  setEnergyKwh={setEnergyKwh}
                  setPostcode={setPostcode}
                  setProgress={setProgress}
                  setShowConfetti={props.setShowConfetti}
                  startCounter={props.startCounter}
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
