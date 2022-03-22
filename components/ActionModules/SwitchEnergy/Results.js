import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, List, Modal, Row, Select, Space } from 'antd'
import React, { useMemo, useState } from 'react'

import RobinIcon from '../../../assets/icons/robin.svg'
import { useIsMobile } from '../../../hooks'
import {
  useOperatorId,
  useSwitchRates,
} from '../../../services/switchforclimate'
import { MODAL_WIDTH_MD } from '../../../utils'
import { text } from '../../../utils/Text'
import { CardView } from '../../Elements/Cards'
import CheckList from '../../Elements/CheckList'
import Category from '../helpers/Category'
import { EnergyForm } from './Calculate'

const { Option } = Select

const SORT = [
  { label: 'Preis', type: 'price' },
  { label: 'Impact', type: 'impact' },
]

export const getFullPrice = (item, kwh) =>
  item.price.workingPrice * kwh + item.price.basePrice || 0

export const Results = ({
  goTo,
  icon,
  moduleBlocks,
  moduleData,
  moduleLists,
  setStore,
  store,
}) => {
  const isMobile = useIsMobile()
  const [visible, setVisible] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [sorting, setSorting] = useState(SORT[0].type)

  const changeSorting = (value) => {
    setSorting(value)
  }

  const updateProviders = (values) => {
    setVisible(false)
    setStore({
      postcode: values.postcode,
      users: values.users,
    })
  }

  const getFirstOperatorId = (o) => (o ? Object.keys(o)[0] : null)
  const { data: operatorData, isLoading: fetchingOperators } = useOperatorId(
    store?.postcode
  )
  const { city, operators } = operatorData?.locations[0] || {}
  const firstOperatorId = getFirstOperatorId(operators)

  const { data: rates, isLoading: fetchingRates } = useSwitchRates(
    store?.postcode,
    city,
    store?.users,
    firstOperatorId
  )

  const switchRates = rates?.switchRates

  const sortedList = useMemo(() => {
    if (!switchRates) return []
    if (sorting === 'price') {
      return switchRates.sort((a, b) => {
        const priceA = getFullPrice(a, store?.users)
        const priceB = getFullPrice(b, store?.users)
        return priceA - priceB
      })
    } else {
      return switchRates.sort(
        (a, b) =>
          b.rating.contributionByConsumption -
          a.rating.contributionByConsumption
      )
    }
  }, [sorting, store?.users, switchRates])

  const loading = fetchingOperators || fetchingRates

  return (
    <div className="step">
      <Category
        goBack={() => goTo('calculate')}
        icon={icon}
        title={
          <span>
            {text(moduleBlocks['category.title'])}{' '}
            {loading && <LoadingOutlined />}{' '}
          </span>
        }
      />
      <h2>{text(moduleBlocks['results.title'])}</h2>
      <CheckList data={moduleLists['comparison.benefits']} />

      <Row>
        <Col xs={12}>
          <RobinIcon />
        </Col>
        <Col className="actions-bar" style={{ textAlign: 'right' }} xs={12}>
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => setVisible(true)}
              type="primary"
            />
            <Select onChange={changeSorting} value={sorting}>
              <Option value="price">Price</Option>
              <Option value="impact">Impact</Option>
            </Select>
          </Space>
        </Col>
      </Row>

      <List
        className="comparison-list"
        dataSource={sortedList}
        loading={loading}
        renderItem={(item, i) => (
          <CardView
            energyKwh={store?.users}
            item={item}
            key={`card-${i}`}
            layout="provider"
            next={() => {
              goTo('form-switch')
            }}
          />
        )}
      />

      <Drawer
        className={`drawer-md`}
        destroyOnClose
        footer={null}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={isMobile ? '100%' : MODAL_WIDTH_MD}
      >
        Something
      </Drawer>

      <Modal footer={null} onCancel={() => setVisible(false)} visible={visible}>
        <EnergyForm
          data={moduleData}
          initialValues={{ postcode: store?.postcode, users: store?.users }}
          moduleBlocks={moduleBlocks}
          moduleData={moduleData}
          onFinish={updateProviders}
        />
      </Modal>
    </div>
  )
}
