import { Carousel } from 'antd'
import React, { useRef } from 'react'

import { text } from '../../../utils/Text'
import { ArrowButton } from '../../Elements/ArrowButton'
import { CardView } from '../../Elements/Cards'
import { DetailView } from '../../Elements/DetailViews'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Details = ({
  goTo,
  icon,

  moduleBlocks,
  nextKey,
  prevKey,
  setStore,
  store,
}) => {
  const sliderRef = useRef()

  const selectedPoliticians = store?.selectedPoliticians || []
  const activePolitician = selectedPoliticians[store.politicianSlideIndex]

  return (
    <div className="step">
      <Category
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon}
        title={text(moduleBlocks['details.title'])}
      />

      <StepHeader
        subtitle={moduleBlocks['details.subtitle']}
        title={moduleBlocks['details.title']}
      />

      <Carousel
        arrows
        beforeChange={(_, next) =>
          setStore({ ...store, politicianSlideIndex: next })
        }
        className="custom-slider"
        dots={false}
        infinite={false}
        nextArrow={<ArrowButton />}
        prevArrow={<ArrowButton />}
        ref={sliderRef}
        slidesToShow={1}
        variableWidth
      >
        {selectedPoliticians.map((politician) => (
          <div className="fixed-width-wrapper" key={politician.id}>
            <CardView item={politician} layout="politician" minimal />
          </div>
        ))}
      </Carousel>

      {activePolitician ? (
        <DetailView
          item={activePolitician}
          layout="politician"
          onFinish={() => goTo(nextKey)}
          setStore={setStore}
          store={store}
        />
      ) : (
        <div>No politicians selected, go back</div>
      )}
    </div>
  )
}
