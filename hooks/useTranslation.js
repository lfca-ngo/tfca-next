import React, { createContext, useContext, useEffect, useState } from 'react'

const TranslationContext = createContext()

// content is passed during the build process on every page
// therefore the translation provider is fulled on boot up
export const TranslationProvider = ({ children, content }) => {
  const [store, setStore] = useState({})

  useEffect(() => {
    setStore(content)
  }, [content])

  return (
    <TranslationContext.Provider
      value={{
        store,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export const useContent = () => {
  const context = useContext(TranslationContext)
  return context
}
