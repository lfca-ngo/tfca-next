import React, { createContext, useContext } from 'react'

const TranslationContext = createContext()

// content is passed during the build process on every page
// therefore the translation provider is fulled on boot up
export const TranslationProvider = ({ children, content }) => {
  return (
    <TranslationContext.Provider
      value={{
        store: content,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export const useContent = () => {
  const context = useContext(TranslationContext)
  return context.store
}

export const useBlocks = (key) => {
  const context = useContext(TranslationContext)
  return context.store?.metaData?.blocks?.[key] || ''
}

export const useNavs = (key) => {
  const context = useContext(TranslationContext)
  return context.store?.navs?.[key] || ''
}

export const useLists = (key) => {
  const context = useContext(TranslationContext)
  return context.store?.metaDataLists?.[key] || { items: [] }
}
