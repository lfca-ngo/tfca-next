import { Alert, Button, Select } from 'antd'
import debounce from 'lodash/debounce'
import React, { useRef, useState } from 'react'

import {
  useRobinWoodRating,
  useSearchRobinWoodProvider,
} from '../../../services/switchforclimate'
import { textBlockToString } from '../../../utils'
import {
  Category,
  FetchError,
  LoadingSpinner,
  StepHeader,
} from '../../Elements'
import { COMPLETE } from '..'

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
        title={textBlockToString(blocks['category.title'])}
      />

      <StepHeader
        subtitle={blocks['checkprovider.description']}
        title={blocks['checkprovider.title']}
      />

      <Select
        data-testid="switch-energy-form-check-provider-search-input"
        defaultActiveFirstOption={false}
        filterOption={false}
        loading={isSearchLoading}
        notFoundContent={null}
        onChange={setSelectedProviderName}
        onSearch={debouncedSearch}
        placeholder={textBlockToString(
          blocks['checkprovider.select.placeholder']
        )}
        showSearch
        style={{ width: '100%' }}
        value={selectedProviderName}
      >
        {searchResult?.robinWoodProviders?.map((item) => (
          <Option
            data-testid="switch-energy-form-check-priovider-option"
            key={item.companyName}
            value={item.companyName}
          >
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
              description={textBlockToString(
                blocks['checkprovider.result.success']
              )}
              message={textBlockToString(
                blocks['checkprovider.result.success.title']
              )}
              showIcon
              type="success"
            />
            <Button
              block
              data-testid="switch-energy-form-check-complete-btn"
              onClick={() => goTo(COMPLETE)}
              size="large"
              style={{ marginTop: '15px' }}
              type="primary"
            >
              {textBlockToString(blocks['checkprovider.button.primary'])}
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
                      textBlockToString(
                        blocks['checkprovider.result.fail.fallback']
                      ),
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
              {textBlockToString(
                blocks['checkprovider.result.button.changenow']
              )}
            </Button>
          </div>
        )
      ) : null}
    </div>
  )
}
