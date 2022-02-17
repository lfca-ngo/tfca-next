import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, List, Modal, Row, Select, Space } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'

import RobinIcon from '../../../assets/icons/robin.svg'
// import useAnalytics from '../../../hooks/useAnalytics'
import {
  useOperatorId,
  useSwitchRates,
} from '../../../services/switchforclimate'
import ProviderCard from '../../Elements/Cards/ProviderCard'
import CheckList from '../../Elements/CheckList'
import Category from '../Category'
import { EnergyForm } from './Calculate'

const { Option } = Select

const SORT = [
  { type: 'price', label: 'Preis' },
  { type: 'impact', label: 'Impact' },
]

export const getFullPrice = (item, kwh) =>
  item.price.workingPrice * kwh + item.price.basePrice || 0

const Results = ({
  energyKwh,
  goTo,
  module,
  name,
  postcode,
  setEnergyKwh,
  setPostcode,
  setProgress,
}) => {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [sorting, setSorting] = useState(SORT[0].type)
  const [results, setResults] = useState([])
  // const { trackEvent } = useAnalytics()

  const sortedList = useMemo(() => {
    if (!results) return []
    if (sorting === 'price') {
      return results.sort((a, b) => {
        const priceA = getFullPrice(a, energyKwh)
        const priceB = getFullPrice(b, energyKwh)
        return priceA - priceB
      })
    } else {
      return results.sort(
        (a, b) =>
          b.rating.contributionByConsumption -
          a.rating.contributionByConsumption
      )
    }
  }, [sorting, energyKwh, results])

  const changeSorting = (value) => {
    setSorting(value)
    // trackEvent('changed_sorting', { type: value })
  }

  const updateProviders = (values) => {
    setVisible(false)
    setPostcode(values.postcode)
    setEnergyKwh(values.users)
  }

  const fetchProviders = async (postCode, energyKwh) => {
    setLoading(true)
    // const { city, operatorId } = await getOperatorId(postCode)
    // const switchRates = await getSwitchRates(
    //   postCode,
    //   city,
    //   energyKwh,
    //   operatorId
    // )
    setResults(switchRates)
    setLoading(false)
  }

  useEffect(() => {
    if (postcode && energyKwh) {
      // fetchProviders(postcode, energyKwh)
    }
  }, [postcode, energyKwh])

  return (
    <div className="step">
      <Category
        goBack
        prev={() => goTo('calculate')}
        title={
          <span>
            {module.categoryTitle} {loading && <LoadingOutlined />}{' '}
          </span>
        }
        type={name}
      />
      <h2>{module.stepResultsTitle}</h2>
      <CheckList data={module.arguments} />

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
          initialValues={{ postcode: postcode, users: energyKwh }}
          onFinish={updateProviders}
        />
      </Modal>
    </div>
  )
}

export default Results
