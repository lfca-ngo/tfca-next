import { FileDoneOutlined, LoadingOutlined } from '@ant-design/icons'
import { Alert, Button, ConfigProvider, Form, Select } from 'antd'
import React, { useEffect, useState } from 'react'

// import { renderAsHtml } from '../../../utils'
import Category from '../Category'

const { Option } = Select

const GREEN = [
  'Naturstrom',
  'Fair Trade Power',
  'EWS Schönau',
  'Green Planet (Greenpeace Energy)',
  'Bürgerwerke',
  'Polarstern',
  'LichtBlick',
  'Westfalen WIND',
  'Enspire Energie',
  'Prokon',
  'Mann Strom',
  'Ökostrom +',
  'ProEngeno',
  'Bremer SolidarStrom',
  'Wemag',
]

const customizeRenderEmpty = () => (
  <div
    style={{
      margin: '20px 0',
      textAlign: 'center',
    }}
  >
    <FileDoneOutlined style={{ fontSize: 32, marginBottom: '20px' }} />
    <p>Du findest den Namen deines Providers z.B. auf deiner Stromrechnung</p>
  </div>
)

const CheckProvider = (props) => {
  const [provider, setProvider] = useState()
  const [loading, setLoading] = useState()

  const onFinish = async (values) => {}

  const handleChange = (val) => {
    setProvider(val)
  }

  const handleNext = () => props.goTo('success', { smooth: true })

  const isVerified = provider !== '-'
  const infoAlert = isVerified ? (
    <Alert
      description="Dein Provider erfüllt bereits alle Vorgaben als unabhängiger Ökostromlieferant. Klick auf den Button, um deine Challenge erfolgreich abzuschließen!"
      message="Wunderbar!"
      showIcon
      type={'success'}
    />
  ) : (
    <Alert
      description={
        <div>
          Dein Provider erfüllt nicht die höchsten Herausforderungen an
          Ökostrom. Um die Challenge abzuschließen, kannst du mit wenigen Klicks
          deinen Anbieter wechseln!
        </div>
      }
      message="Schade!"
      showIcon
      type="warning"
    />
  )

  const continueButton = isVerified ? (
    <Button
      block
      disabled={!provider}
      onClick={handleNext}
      size="large"
      style={{ marginTop: '15px' }}
      type="primary"
    >
      Challenge abschließen
    </Button>
  ) : (
    <Button
      block
      onClick={() => props.goTo('calculate')}
      size="large"
      style={{ marginTop: '15px' }}
      type="primary"
    >
      Jetzt Provider wechseln
    </Button>
  )

  return (
    <div className="step">
      <Category
        goBack
        prev={() => props.goTo('intro')}
        title={props.module.categoryTitle}
        type={props.name}
      />
      <h2>{`Wunderbar!  Überprüfe deinen Provider um die Challenge abzuschließen`}</h2>
      {/* {renderAsHtml(props.module.stepAlreadyDoneText)} */}
      <p>
        Leider sind nicht alle Tarife auf denen “ökostrom” drauf steht, auch
        echter Ökostrom. Unsere Datenbank enthält alle Ökostromanbieter die
        höchsten Standards entsprechen.
      </p>

      <Form>
        {/* {ITEMS.postcode()} */}
        <Form.Item name="provider">
          <ConfigProvider renderEmpty={customizeRenderEmpty}>
            <Select
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChange}
              optionFilterProp="children"
              placeholder={
                <span>
                  Wähle deinen Provider {loading && <LoadingOutlined />}
                </span>
              }
              showSearch
              size="large"
              style={{ width: '100%' }}
              value={provider}
            >
              {GREEN.map((provider) => (
                <Option key={provider} value={provider}>
                  {provider}
                </Option>
              ))}
              <Option key={'-'} value={'-'}>
                Anderer Provider
              </Option>
            </Select>
          </ConfigProvider>
        </Form.Item>

        {provider && infoAlert}
        {continueButton}
      </Form>
    </div>
  )
}

export default CheckProvider
