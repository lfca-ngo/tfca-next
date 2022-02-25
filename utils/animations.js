export const textReveal = {
  hidden: {
    opacity: 0,
    y: `100%`,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.5,
    },
    y: 0,
  },
}

export const appear = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
}
