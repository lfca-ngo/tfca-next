import { LoadingOutlined } from '@ant-design/icons'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Form } from 'antd'
import React, { useEffect } from 'react'

import { useConfetti } from '../../../hooks/useChallenge'
import { useIsMobile } from '../../../hooks/useIsClient'
import { useBlocks, useLists } from '../../../hooks/useTranslation'
import { text } from '../../../utils/Text'
import CheckList from '../../Elements/CheckList'
import { NominateNameInput } from '../../Elements/NominateInput'
import Category from './Category'
import { Share } from './Share'

const Success = (props) => {
  const isMobile = useIsMobile()
  const { goTo, setProgress } = props
  const benefits = useLists('sharing.benefits')
  const [isGeneratingToken, setIsGeneratingToken] = React.useState(false)
  const [error, setError] = React.useState('')
  const [visible, setVisible] = React.useState('')
  const [shareLink, setShareLink] = React.useState()

  useConfetti() // creates confetti

  useEffect(() => {
    setProgress(1)
  }, [setProgress])

  return (
    <>
      <div className="step">
        <Category
          icon={props.icon}
          title={text(props.blocks['category.title'])}
        />
        <h2>{text(useBlocks('sharing.headline'))}</h2>

        <CheckList data={benefits?.items} />
        <Form
          initialValues={{ names: [{ challenge: 'Energy', name: null }] }}
          layout="vertical"
          name="dynamic_invitees"
          onFinish={(val) => console.log(val)}
          onFinishFailed={(error) => console.log(error)}
        >
          <Form.List name="names">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item key={field.key} required={false}>
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          message: 'Please input a name or delete this field.',
                          required: true,
                        },
                      ]}
                      validateTrigger={['onChange', 'onBlur']}
                    >
                      <NominateNameInput
                        placeholder="Name"
                        style={{ width: '60%' }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    type="dashed"
                  >
                    Add field
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Loading modal while generating shareToken */}
      <Drawer
        className={`drawer-md`}
        footer={null}
        onCancel={() => setError('')}
        visible={visible}
        width={isMobile ? '100%' : '700px'}
      >
        {error ? (
          <h3>{error}</h3>
        ) : (
          <div>
            {isGeneratingToken && <LoadingOutlined />}
            <Share shareLink={shareLink} />
          </div>
        )}
      </Drawer>
    </>
  )

  // create multiple invite links
  // map of promises with infos
  const createInvites = (invitees) => {
    setVisible(true)
    setIsGeneratingToken(true)
  }

  async function createInvite({ invitee1, invitee2, invitee3 }) {
    // Gereate the share token
    const tokenPayload = {
      invitee1,
      invitee2,
      invitee3,
      // TODO: Get sender Info from challenge inputs?
      sender: {
        challenge: 'energy',
        name: 'DavidStatic',
      },
    }

    try {
      const response = await fetch('/api/create-shareable-link', {
        // TODO: Dynamically set actionCollectionSlug
        body: JSON.stringify({
          actionCollectionSlug: 'new',
          tokenPayload,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { ogImage, shortLink } = await response.json()

      return { ogImage, shortLink }
    } catch (e) {
      setError('Failed to generate link')
    }
  }
}

export default Success
