import { Alert, Button, Select } from 'antd'
import debounce from 'lodash/debounce'
import React, { useRef, useState } from 'react'

import {
  useRobinWoodRating,
  useSearchRobinWoodProvider,
} from '../../../services/switchforclimate'
import { text } from '../../../utils/Text'
import { Category } from '../../Elements/Category'
import { FetchError } from '../../Elements/FetchError'
import { LoadingSpinner } from '../../Elements/LoadingSpinner'
import { StepHeader } from '../../Elements/StepHeader'

const { Option } = Select

export const FormCheck = ({ goTo, module: { blocks = {}, icon = {} } }) => {
  const [selectedProviderName, setSelectedProviderName] = useState(null)
  const [searchText, setSearchText] = useState('')
  const {
    data: searchResult,
    error: searchError,
    isLoading: isSearchLoading,
  } = useSearchRobinWoodProvider(searchText)
  const {
    data: ratingResult,
    error: ratingError,
    isLoading: isRatingLoading,
    refetch: refetchRating,
  } = useRobinWoodRating(selectedProviderName)

  const debouncedSearch = useRef(
    debounce((nextValue) => setSearchText(nextValue), 250)
  ).current

  return (
    <div className="step">
      <Category
        goBack={() => goTo('intro')}
        icon={icon.url}
        title={text(blocks['category.title'])}
      />

      <StepHeader
        subtitle={blocks['checkprovider.description']}
        title={blocks['checkprovider.title']}
      />

      <Select
        defaultActiveFirstOption={false}
        filterOption={false}
        loading={isSearchLoading}
        notFoundContent={null}
        onChange={setSelectedProviderName}
        onSearch={debouncedSearch}
        placeholder="Wähle einen Versorger"
        showSearch
        style={{ width: '100%' }}
        value={selectedProviderName}
      >
        {searchResult?.robinWoodProviders?.map((item) => (
          <Option key={item.companyName} value={item.companyName}>
            {item.companyName}
          </Option>
        ))}
      </Select>

      {searchError || ratingError ? (
        <FetchError onRefetch={ratingError ? refetchRating : undefined} />
      ) : isRatingLoading ? (
        <LoadingSpinner />
      ) : ratingResult ? (
        ratingResult.robinWoodRating?.recommendation === 'yes' ? (
          <div style={{ marginTop: '15px' }}>
            <Alert
              description="Dein Provider erfüllt bereits alle Vorgaben als unabhängiger Ökostromlieferant. Klick auf den Button, um deine Challenge erfolgreich abzuschließen!"
              message="Wunderbar!"
              showIcon
              type="success"
            />
            <Button
              block
              onClick={() => goTo('success')}
              size="large"
              style={{ marginTop: '15px' }}
              type="primary"
            >
              Challenge abschließen
            </Button>
          </div>
        ) : (
          <div style={{ marginTop: '15px' }}>
            <Alert
              description={
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      ratingResult.robinWoodRating?.reason ||
                      'Dein Provider erfüllt nicht die höchsten Herausforderungen an Ökostrom.',
                  }}
                />
              }
              message={
                <div
                  dangerouslySetInnerHTML={{
                    __html: ratingResult.robinWoodRating?.text,
                  }}
                />
              }
              showIcon
              type="warning"
            />
            <Button
              block
              onClick={() => goTo('calculate')}
              size="large"
              style={{ marginTop: '15px' }}
              type="primary"
            >
              Jetzt Provider wechseln
            </Button>
          </div>
        )
      ) : null}
    </div>
  )
}
