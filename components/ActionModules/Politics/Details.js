import { Button, Carousel } from 'antd'
import React, { useRef } from 'react'

import { text } from '../../../utils/Text'
import { ArrowButton } from '../../Elements/ArrowButton'
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
        nextArrow={<ArrowButton />}
        prevArrow={<ArrowButton />}
        ref={sliderRef}
        slidesToShow={1}
        variableWidth
      >
        {selectedPoliticians.map((politician) => (
          <div className="fixed-width-wrapper" key={politician.id}>
            <PoliticianCard item={politician} />
          </div>
        ))}
      </Carousel>

      {activePolitician ? (
        <PoliticianDetails
          item={activePolitician}
          onFinish={() => goTo(nextKey)}
          setStore={setStore}
          store={store}
        />
      ) : (
        <div>No politicians selected, go back</div>
      )}

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
