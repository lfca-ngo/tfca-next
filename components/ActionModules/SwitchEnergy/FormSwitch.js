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
import React, { useState } from 'react'

import { text } from '../../../utils/Text'
import CheckList from '../../Elements/CheckList'
import Category from '../helpers/Category'

const { Option } = Select
const { TabPane } = Tabs

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
  address: () => (
    <Form.Item
      label="Straße und Hausnummer"
      name="address"
      rules={[{ message: 'Bitte gib deine Adresse an!', required: true }]}
    >
      <Input placeholder="Auf der Erde 2" size="large" />
    </Form.Item>
  ),
  alreadyCancelled: () => (
    <Form.Item
      initialValue={false}
      label="Hast du deinen Vertrag schon gekündigt?"
      name="alreadyCancelled"
      rules={[{ message: 'Please input your username!', required: true }]}
    >
      <Select size="large">
        <Option value={false}>Nein, noch nicht</Option>
        <Option value={true}>Ja, habe ich schon</Option>
      </Select>
    </Form.Item>
  ),

  city: () => (
    <Form.Item
      label="Stadt"
      name="city"
      rules={[{ message: 'Bitte gib deine Stadt an!', required: true }]}
    >
      <Input placeholder="Paris" size="large" />
    </Form.Item>
  ),
  confirmEmail: () => (
    <Form.Item
      dependencies={['email']}
      label="Bestätige deine Email"
      name="confirmEmail"
      rules={[
        { message: 'Wiederhole deine Email!', required: true, type: 'email' },
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
      rules={[{ message: 'Please input your username!', required: true }]}
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
  email: () => (
    <Form.Item
      label="Email"
      name="email"
      rules={[
        { message: 'Gib deine Email an!', required: true, type: 'email' },
      ]}
    >
      <Input placeholder="greta.thunberg@earth.io" size="large" />
    </Form.Item>
  ),
  firstname: () => (
    <Form.Item
      label="Vorname"
      name="firstname"
      rules={[{ message: 'Bitte gib deinen Vornamen an!', required: true }]}
    >
      <Input placeholder="Greta" size="large" />
    </Form.Item>
  ),
  iban: () => (
    <Form.Item
      label="IBAN"
      name="iban"
      rules={[{ message: 'Please input your username!', required: true }]}
    >
      <Input placeholder="DE12872220001222" size="large" />
    </Form.Item>
  ),
  lastname: () => (
    <Form.Item
      label="Nachname"
      name="lastname"
      rules={[{ message: 'Bitte gib deinen Nachnamen an!', required: true }]}
    >
      <Input placeholder="Thunberg" size="large" />
    </Form.Item>
  ),
  postcode: () => (
    <Form.Item
      label="Postleitzahl"
      name="postcode"
      rules={[{ message: 'Wie lautet deine Postleitzahl?', required: true }]}
    >
      <Input placeholder="12099" size="large" />
    </Form.Item>
  ),
  provider: () => (
    <Form.Item
      label="Name deines aktuellen Providers"
      name="provider"
      rules={[{ message: 'Please input your username!', required: true }]}
    >
      <Input placeholder="Vattenfall" size="large" />
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
  // const { trackEvent } = useAnalytics()
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    setLoading(true)
    const res = { status: 200 } // await trackEvent('form_submit', values)
    setLoading(false)
    if (res?.status === 200) {
      props.goTo('success')
    } else {
      alert('Etwas ist schiefgelaufen. Bitte melde dich bei timo@lfca.earth')
    }
  }

  return (
    <div className="step">
      <Category
        goBack
        icon={props.icon}
        prev={() => props.goTo('results')}
        title={text(props.blocks['category.title'])}
      />
      <h2>Eine sehr gute Wahl. Du hast es fast geschafft!</h2>

      <div>
        Gerade keine Zeit? Wir senden dir eine{' '}
        <Button
          icon={<MailOutlined />}
          onClick={() => setVisible(true)}
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
