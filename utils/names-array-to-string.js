export function namesArrayToString(names = ['']) {
  if (names.length === 1) {
    return names[0]
  } else {
    return `${names.slice(0, names.length - 1).join(', ')} and ${
      names[names.length - 1]
    }`
  }
}
