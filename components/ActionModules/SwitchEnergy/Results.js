import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, List, Modal, Row, Select, Space } from 'antd'
import React, { useMemo, useState } from 'react'

import RobinIcon from '../../../assets/icons/robin.svg'
import {
  useOperatorId,
  useSwitchRates,
} from '../../../services/switchforclimate'
import { text } from '../../../utils/text'
import {
  CardView,
  Category,
  CheckList,
  DetailView,
  FetchError,
  spinnerProps,
  StepHeader,
} from '../../Elements'
import { EnergyForm } from './Calculate'

const { Option } = Select

const SORT = [
  { label: 'Preis', type: 'price' },
  { label: 'Impact', type: 'impact' },
]

export const getFullPrice = (item, kwh) =>
  item.price.workingPrice * kwh + item.price.basePrice || 0

export const Results = ({ goTo, module, nextKey, setStore, store }) => {
  const { blocks = {}, lists = {}, icon = {} } = module
  const [visible, setVisible] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [sorting, setSorting] = useState(SORT[0].type)

  const changeSorting = (value) => {
    setSorting(value)
  }

  const updateProviders = (values) => {
    setVisible(false)
    setStore({
      ...store,
      energy: values?.postcodeEnergy?.energy,
      postcode: values?.postcodeEnergy?.postcode,
    })
  }

  const showDetails = (item) => {
    setStore({ ...store, item: item })
    setDrawerVisible(true)
  }

  const getFirstOperatorId = (o) => (o ? Object.keys(o)[0] : null)
  const {
    data: operatorData,
    error: operatorError,
    isLoading: fetchingOperators,
  } = useOperatorId(store?.postcode)
  const { city, operators } = operatorData?.locations[0] || {}
  const firstOperatorId = getFirstOperatorId(operators)

  const {
    data: rates,
    error: ratesError,
    isLoading: fetchingRates,
    refetch: refetchRates,
  } = useSwitchRates(store?.postcode, city, store?.energy, firstOperatorId)

  const handleOnNext = (item) => {
    // Set the selected rate + city to the stor
    setStore({
      ...store,
      city,
      item,
      operatorId: firstOperatorId,
    })

    goTo(nextKey)
  }

  const handleGoBack = () => {
    goTo('calculate')
  }

  const switchRates = rates?.switchRates

  const sortedList = useMemo(() => {
    if (!switchRates) return []
    if (sorting === 'price') {
      return switchRates.sort((a, b) => {
        const priceA = getFullPrice(a, store?.energy)
        const priceB = getFullPrice(b, store?.energy)
        return priceA - priceB
      })
    } else {
      return switchRates.sort(
        (a, b) =>
          b.rating.contributionByConsumption -
          a.rating.contributionByConsumption
      )
    }
  }, [sorting, store?.energy, switchRates])

  const loading = fetchingOperators || fetchingRates

  return (
    <div className="step">
      <Category
        goBack={handleGoBack}
        icon={icon.url}
        title={
          <span>
            {text(blocks['category.title'])} {loading && <LoadingOutlined />}{' '}
          </span>
        }
      />
      <StepHeader title={blocks['results.title']} />
      <CheckList data={lists['comparison.benefits']?.items} />

      {operatorError || (operatorData && !firstOperatorId) ? (
        <FetchError onRefetch={handleGoBack} />
      ) : ratesError ? (
        <FetchError onRefetch={refetchRates} />
      ) : (
        <>
          <Row>
            <Col xs={12}>
              <div className="robin-wood-icon">
                <RobinIcon />
              </div>
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
            loading={spinnerProps(loading)}
            renderItem={(item, i) => (
              <CardView
                energyKwh={store?.energy}
                item={item}
                key={`card-${i}`}
                layout="provider"
                onNext={() => handleOnNext(item)}
                showDetails={showDetails}
              />
            )}
          />

          <Drawer
            className={`drawer-md`}
            destroyOnClose
            footer={null}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
          >
            <DetailView
              energyKwh={store?.energy}
              item={store?.item}
              layout="provider"
              onNext={() => handleOnNext(store?.item)}
            />
          </Drawer>

          <Modal
            footer={null}
            onCancel={() => setVisible(false)}
            visible={visible}
          >
            <EnergyForm
              initialValues={{
                postcodeEnergy: {
                  energy: store?.energy,
                  postcode: store?.postcode,
                },
              }}
              module={module}
              onFinish={updateProviders}
            />
          </Modal>
        </>
      )}
    </div>
  )
}
