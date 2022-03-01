import { useState } from 'react'

// helper hook for managing the flow state of
// the different action modules
export const useFlow = ({ id, initial }) => {
  const [store, setStore] = useState({})
  const [index, set] = useState(initial)

  const scroll = (id) => {
    const section = document.querySelector(`#${id}`)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goTo = (page) => {
    set(page)
    scroll(id)
  }

  return {
    goTo: goTo,
    index: index,
    set: set,
    setStore: setStore,
    store: store,
  }
}
