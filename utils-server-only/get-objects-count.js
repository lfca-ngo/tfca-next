// Helper to get count of entries in object
export const safeGetObjectsCount = (object) => {
  if (typeof object !== 'object') return 0
  return Object.keys(object).length
}
