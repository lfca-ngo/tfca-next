import { Button, Modal } from 'antd'
import React from 'react'

export const BasicModal = ({ content, setVisible, title, visible }) => {
  return (
    <Modal
      destroyOnClose
      footer={[
        <Button key="submit" onClick={() => setVisible(false)} type="primary">
          Schließen
        </Button>,
      ]}
      onCancel={() => setVisible(false)}
      title={{ title }}
      visible={visible}
      wrapClassName={`modal-md has-top`}
    >
      {content}
    </Modal>
  )
}
