import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, List, Modal, Row, Select, Space } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'

import RobinIcon from '../../../assets/icons/robin.svg'
import {
  useOperatorId,
  useSwitchRates,
} from '../../../services/switchforclimate'
import { Text, text } from '../../../utils/Text'
import ProviderCard from '../../Elements/Cards/ProviderCard'
import CheckList from '../../Elements/CheckList'
import Category from '../Category'
import { EnergyForm } from './Calculate'

const { Option } = Select

const SORT = [
  { label: 'Preis', type: 'price' },
  { label: 'Impact', type: 'impact' },
]

export const getFullPrice = (item, kwh) =>
  item.price.workingPrice * kwh + item.price.basePrice || 0

const Results = ({
  blocks,
  energyKwh,
  goTo,
  lists,
  module,
  name,
  postcode,
  setEnergyKwh,
  setPostcode,
  setProgress,
}) => {
  const [visible, setVisible] = useState(false)
  const [sorting, setSorting] = useState(SORT[0].type)

  const changeSorting = (value) => {
    setSorting(value)
  }

  const updateProviders = (values) => {
    setVisible(false)
    setPostcode(values.postcode)
    setEnergyKwh(values.users)
  }

  const getFirstOperatorId = (o) => (o ? Object.keys(o)[0] : null)
  const { data, isLoading: fetchingOperators } = useOperatorId(postcode)
  const { city, operators } = data?.locations[0] || {}
  const firstOperatorId = getFirstOperatorId(operators)

  const { data: rates, isLoading: fetchingRates } = useSwitchRates(
    postcode,
    city,
    energyKwh,
    firstOperatorId
  )

  const switchRates = rates?.switchRates

  const sortedList = useMemo(() => {
    if (!switchRates) return []
    if (sorting === 'price') {
      return switchRates.sort((a, b) => {
        const priceA = getFullPrice(a, energyKwh)
        const priceB = getFullPrice(b, energyKwh)
        return priceA - priceB
      })
    } else {
      return switchRates.sort(
        (a, b) =>
          b.rating.contributionByConsumption -
          a.rating.contributionByConsumption
      )
    }
  }, [sorting, energyKwh, switchRates])

  const loading = fetchingOperators || fetchingRates

  return (
    <div className="step">
      <Category
        goBack
        prev={() => goTo('calculate')}
        title={
          <span>
            {text(blocks['category.title'])} {loading && <LoadingOutlined />}{' '}
          </span>
        }
        type={name}
      />
      <h2>{text(blocks['results.title'])}</h2>
      <CheckList data={lists.comparison_benefits} />

      <Row>
        <Col xs={12}>
          <RobinIcon />
        </Col>
        <Col className="actions-bar" xs={12}>
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
          <ProviderCard
            energyKwh={energyKwh}
            item={item}
            key={`card-${i}`}
            next={() => {
              setProgress(0.75)
              goTo('form')
            }}
          />
        )}
      />

      <Modal footer={null} onCancel={() => setVisible(false)} visible={visible}>
        <EnergyForm
          blocks={blocks}
          initialValues={{ postcode: postcode, users: energyKwh }}
          onFinish={updateProviders}
        />
      </Modal>
    </div>
  )
}

export default Results
