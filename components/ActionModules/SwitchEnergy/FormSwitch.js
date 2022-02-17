import {
  InfoCircleOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Popover,
  Row,
  Select,
  Tabs,
} from 'antd'
import React, { useEffect, useState } from 'react'

// import useAnalytics from '../../../hooks/useAnalytics'
import CheckList from '../../Elements/CheckList'
import Category from '../Category'

const { Option } = Select
const { TabPane } = Tabs

const ARGS_NOW = (name) => [
  {
    text: `Nach dem Aufgeben deiner Bestellung erhältst du eine Bestätigung per
    Email. Dein Vertrag kommt direkt mit dem Provider zu stande. Wir sind
    nur hier um deinen Umstieg so einfach wie möglich zu machen!`,
  },
  {
    text: `Garantiert keine Extrakosten und keine Doppelzahlungen. Der Provider kümmert sich um die Kündigung deines existierenden Vertrags.`,
  },
  {
    text: `${name} hat bei uns eine Handynummer hinterlegt und bekommt sofort eine
    Nachricht sobald du die Challenge erfüllt hast! 🚀`,
  },
]

const GroupWrapper = (props) => {
  return (
    <div className="form-group">
      <div className="form-group-inner">
        {props.label && <div className="form-group-label">{props.label}</div>}
        {props.description && (
          <div className="form-group-description">{props.description}</div>
        )}
        {props.children}
      </div>
    </div>
  )
}

const ITEMS = {
  firstname: () => (
    <Form.Item
      label="Vorname"
      name="firstname"
      rules={[{ required: true, message: 'Bitte gib deinen Vornamen an!' }]}
    >
      <Input placeholder="Greta" size="large" />
    </Form.Item>
  ),
  lastname: () => (
    <Form.Item
      label="Nachname"
      name="lastname"
      rules={[{ required: true, message: 'Bitte gib deinen Nachnamen an!' }]}
    >
      <Input placeholder="Thunberg" size="large" />
    </Form.Item>
  ),
  address: () => (
    <Form.Item
      label="Straße und Hausnummer"
      name="address"
      rules={[{ required: true, message: 'Bitte gib deine Adresse an!' }]}
    >
      <Input placeholder="Auf der Erde 2" size="large" />
    </Form.Item>
  ),
  postcode: () => (
    <Form.Item
      label="Postleitzahl"
      name="postcode"
      rules={[{ required: true, message: 'Wie lautet deine Postleitzahl?' }]}
    >
      <Input placeholder="12099" size="large" />
    </Form.Item>
  ),
  city: () => (
    <Form.Item
      label="Stadt"
      name="city"
      rules={[{ required: true, message: 'Bitte gib deine Stadt an!' }]}
    >
      <Input placeholder="Paris" size="large" />
    </Form.Item>
  ),
  email: () => (
    <Form.Item
      label="Email"
      name="email"
      rules={[
        { type: 'email', required: true, message: 'Gib deine Email an!' },
      ]}
    >
      <Input placeholder="greta.thunberg@earth.io" size="large" />
    </Form.Item>
  ),
  confirmEmail: () => (
    <Form.Item
      dependencies={['email']}
      label="Bestätige deine Email"
      name="confirmEmail"
      rules={[
        { type: 'email', required: true, message: 'Wiederhole deine Email!' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('email') === value) {
              return Promise.resolve()
            }
            return Promise.reject(
              new Error('Beide Emails müssen übereinstimmen!')
            )
          },
        }),
      ]}
    >
      <Input placeholder="greta.thunberg@earth.io" size="large" />
    </Form.Item>
  ),
  provider: () => (
    <Form.Item
      label="Name deines aktuellen Providers"
      name="provider"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input placeholder="Vattenfall" size="large" />
    </Form.Item>
  ),
  counterId: () => (
    <Form.Item
      label={
        <div>
          Zählernummer{' '}
          <Popover
            content={
              <div>Du findest deine Zählernummer auf dem Stromzähler (Nr.)</div>
            }
          >
            <InfoCircleOutlined />
          </Popover>
        </div>
      }
      name="counterId"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="9128310"
        size="large"
        type="number"
      />
    </Form.Item>
  ),
  iban: () => (
    <Form.Item
      label="IBAN"
      name="iban"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input placeholder="DE12872220001222" size="large" />
    </Form.Item>
  ),
  alreadyCancelled: () => (
    <Form.Item
      initialValue={false}
      label="Hast du deinen Vertrag schon gekündigt?"
      name="alreadyCancelled"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Select size="large">
        <Option value={false}>Nein, noch nicht</Option>
        <Option value={true}>Ja, habe ich schon</Option>
      </Select>
    </Form.Item>
  ),
}

const EmailReminder = (props) => {
  const [loading, setLoading] = useState(false)
  // const { trackEvent } = useAnalytics()

  const onFinish = async (values) => {
    setLoading(true)
    const res = { status: 200 } // await trackEvent('reminder_submit', values)
    setLoading(false)
    if (res?.status === 200) {
      props.close()
    } else {
      alert('Etwas ist schiefgelaufen. Bitte melde dich bei timo@lfca.earth')
    }
    setLoading(false)
  }

  return (
    <Form onFinish={onFinish}>
      {ITEMS.email()}
      <Button
        block
        htmlType="submit"
        loading={loading}
        size="large"
        type="primary"
      >
        Erinnerung einstellen
      </Button>
    </Form>
  )
}

const FormSwitch = (props) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { trackEvent } = useAnalytics()
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    setLoading(true)
    const res = await trackEvent('form_submit', values)
    setLoading(false)
    if (res?.status === 200) {
      props.goTo('success', { smooth: true })
    } else {
      alert('Etwas ist schiefgelaufen. Bitte melde dich bei timo@lfca.earth')
    }
  }

  return (
    <div className="step">
      <Category
        goBack
        prev={() => props.goTo('results')}
        title={props.module.categoryTitle}
        type={props.name}
      />
      <h2>Eine sehr gute Wahl. Du hast es fast geschafft!</h2>
      {/* {renderAsHtml(props.module.stepAlreadyDoneText)} */}
      <CheckList data={ARGS_NOW(props.customization?.from)} />

      <div style={{ fontSize: '16px' }}>
        Gerade keine Zeit? Wir senden dir eine{' '}
        <Button
          icon={<MailOutlined />}
          onClick={() => setVisible(true)}
          style={{ fontSize: '16px' }}
          type="link"
        >
          Erinnerungs-Email
        </Button>
      </div>

      <div>
        <Form
          autoComplete="off"
          form={form}
          initialValues={{ remember: true }}
          layout="vertical"
          name="switch_provider"
          onFinish={onFinish}
        >
          <Divider />

          <GroupWrapper
            label={
              <div>
                Persönliche Daten{' '}
                <Popover
                  content={
                    <div>
                      Wenn du weitere Fragen hast, schau doch mal in unsere{' '}
                      <Button type="link">FAQs</Button>
                    </div>
                  }
                >
                  <InfoCircleOutlined />
                </Popover>
              </div>
            }
          >
            <Row gutter={16}>
              <Col xs={12}>{ITEMS.firstname()}</Col>
              <Col xs={12}>{ITEMS.lastname()}</Col>
            </Row>
            {ITEMS.address()}
            <Row gutter={16}>
              <Col xs={12}>{ITEMS.postcode()}</Col>
              <Col xs={12}>{ITEMS.city()}</Col>
            </Row>
            {ITEMS.email()}
          </GroupWrapper>

          <Divider />

          <GroupWrapper
            description="Wenn du in den letzten 6 Wochen umgezogen bist oder in Kürze umziehen wirst, dann wähle die Umzugsoption."
            label="Anschlussdaten"
          >
            <Tabs>
              <TabPane key="1" tab="Anbieterwechsel">
                {ITEMS.provider()}
                {ITEMS.alreadyCancelled()}
                {ITEMS.counterId()}
              </TabPane>
              <TabPane key="2" tab="Umzug">
                {ITEMS.counterId()}
              </TabPane>
            </Tabs>
          </GroupWrapper>

          <Divider />

          <GroupWrapper
            description="Du zahlst bequem per Lastschrift. Wir übermitteln deine Daten direkt an den Provider."
            label="Zahlungsdaten"
          >
            {ITEMS.iban()}
          </GroupWrapper>

          <Form.Item>
            <Button
              block
              htmlType="submit"
              icon={<LockOutlined />}
              loading={loading}
              size="large"
              type="primary"
            >
              Jetzt sicher wechseln
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal footer={null} onCancel={() => setVisible(false)} visible={visible}>
        <EmailReminder close={() => setVisible(false)} />
      </Modal>
    </div>
  )
}

export default FormSwitch
