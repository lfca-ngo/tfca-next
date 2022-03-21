import { Button, Carousel } from 'antd'
import React, { useEffect, useRef } from 'react'

import { text } from '../../../utils/Text'
import { PoliticianCard } from '../../Elements/Cards'
import { PoliticianDetails } from '../../Elements/DetailViews'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Details = ({
  blocks,
  goTo,
  icon,
  nextKey,
  prevKey,
  setStore,
  store,
}) => {
  const activeIndex = store.slideIndex
  const sliderRef = useRef()

  const selectedPoliticians = store?.selectedItems || []
  const activePolitician = selectedPoliticians[activeIndex]

  return (
    <div className="step">
      <Category
        goBack
        icon={icon}
        prev={() => goTo(prevKey)}
        title={text(blocks['details.title'])}
      />

      <StepHeader
        subtitle={blocks['details.subtitle']}
        title={blocks['details.title']}
      />

      <Carousel
        arrows
        beforeChange={(curr, next) => setStore({ ...store, slideIndex: next })}
        className="custom-slider"
        infinite={false}
        ref={sliderRef}
        slidesToShow={1}
        variableWidth
      >
        {selectedPoliticians.map((politician) => (
          <div
            key={politician.id}
            style={{ marginRight: '20px', width: '600px' }}
          >
            <PoliticianCard item={politician} />
          </div>
        ))}
      </Carousel>

      <PoliticianDetails
        item={activePolitician}
        onFinish={() => goTo(nextKey)}
        setStore={setStore}
        store={store}
      />

      <Button
        block
        className="mt-30"
        onClick={() => sliderRef.current.goTo(0)}
        size="large"
        type="primary"
      >
        Make it count
      </Button>
    </div>
  )
}
