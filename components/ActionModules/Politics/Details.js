import { Carousel } from 'antd'
import React, { useRef } from 'react'

import { text } from '../../../utils/text'
import {
  ArrowButton,
  CardView,
  Category,
  DetailView,
  StepHeader,
} from '../../Elements'

export const Details = ({
  availableFilters,
  goTo,
  module: { blocks = {}, icon = {} },
  messagesByFilterValue,
  messagesRelatedFilterKey,
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
        icon={icon.url}
        title={text(blocks['details.title'])}
      />

      <StepHeader
        subtitle={blocks['details.subtitle']}
        title={blocks['details.title']}
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
          activeMessageIndex={store?.activeMessageIndex}
          availableFilters={availableFilters}
          blocks={blocks}
          item={activePolitician}
          layout="politician"
          messages={messagesByFilterValue[store[messagesRelatedFilterKey]]}
          messagesRelatedFilterKey={messagesRelatedFilterKey}
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
