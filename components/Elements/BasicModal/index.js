require('./styles.less')

import { Modal } from 'antd'
import React from 'react'

export const BasicModal = ({ content, setVisible, title, visible }) => {
  return (
    <Modal
      destroyOnClose
      footer={null}
      onCancel={() => setVisible(false)}
      title={title}
      visible={visible}
      wrapClassName={`modal-md basic-modal`}
    >
      {content}
    </Modal>
  )
}
