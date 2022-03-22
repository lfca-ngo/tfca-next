import { Carousel } from 'antd'
import React, { useRef } from 'react'

import { text } from '../../../utils/Text'
import { ArrowButton } from '../../Elements/ArrowButton'
import { PoliticianCard } from '../../Elements/Cards'
import { PoliticianDetails } from '../../Elements/DetailViews'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Details = ({
  availableFilters,
  goTo,
  icon,
  messagesByFilterValue,
  messagesRelatedFilterKey,
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
          activeMessageIndex={store.activeMessageIndex}
          availableFilters={availableFilters}
          item={activePolitician}
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
