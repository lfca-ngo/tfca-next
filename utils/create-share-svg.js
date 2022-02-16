export function createShareSvg({
  friendChallenge1,
  friendChallenge2,
  friendChallenge3,
  friendName1,
  friendName2,
  friendName3,
  ownName,
}) {
  return `
    <svg width="1082" height="600" viewBox="0 0 1082 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect id="background-left" x="0" width="541" height="600" fill="#1F335E"/>
      <rect id="background-right" x="541" width="541" height="600" fill="#A0BFD4"/>
      
      <svg width="481" height="540" x="30" y="30">
        ${createMultilineText({
          color: '#DCF1FF',
          fontFamily: 'Manrope',
          fontSize: 48,
          fontWeight: 'bold',
          lineHeight: 52,
          maxWidth: 481,
          text: `${ownName} is running on 100% renewables!`,
          x: 0,
          y: 130,
        })}
      </svg>

      <svg width="514" height="148" x="541" y="40">
        <path d="M0.53186 0.500977H440.572C481.052 0.500977 513.867 33.3165 513.867 73.7964V73.7964C513.867 114.276 481.052 147.092 440.572 147.092H0.53186V0.500977Z" fill="#F0F9FF"/>
        <ellipse cx="59" cy="59" rx="19" ry="19" fill="white" stroke="#1F335E" stroke-width="1"/>
        ${createMultilineText({
          boldAsLong: friendName1,
          color: '#1F335E',
          fontFamily: 'Manrope',
          fontSize: 28,
          lineHeight: 32,
          maxWidth: 514 - 90,
          text: `${friendName1} is nominated for the ${friendChallenge1} Challenge`,
          x: 90,
          y: 60,
        })}
      </svg>

      <svg width="514" height="148" x="541" y="218">
        <path d="M0.53186 0.500977H440.572C481.052 0.500977 513.867 33.3165 513.867 73.7964V73.7964C513.867 114.276 481.052 147.092 440.572 147.092H0.53186V0.500977Z" fill="#F0F9FF"/>
        <ellipse cx="59" cy="59" rx="19" ry="19" fill="white" stroke="#1F335E" stroke-width="1"/>
        ${createMultilineText({
          boldAsLong: friendName2,
          color: '#1F335E',
          fontFamily: 'Manrope',
          fontSize: 28,
          lineHeight: 32,
          maxWidth: 514 - 90,
          text: `${friendName2} is nominated for the ${friendChallenge2} Challenge`,
          x: 90,
          y: 60,
        })}
      </svg>

      <svg width="514" height="148" x="541" y="396">
        <path d="M0.53186 0.500977H440.572C481.052 0.500977 513.867 33.3165 513.867 73.7964V73.7964C513.867 114.276 481.052 147.092 440.572 147.092H0.53186V0.500977Z" fill="#F0F9FF"/>
        <ellipse cx="59" cy="59" rx="19" ry="19" fill="white" stroke="#1F335E" stroke-width="1"/>
        ${createMultilineText({
          boldAsLong: friendName3,
          color: '#1F335E',
          fontFamily: 'Manrope',
          fontSize: 28,
          lineHeight: 32,
          maxWidth: 514 - 90,
          text: `${friendName3} is nominated for the ${friendChallenge3} Challenge`,
          x: 90,
          y: 60,
        })}
      </svg>
    </svg>
  `
}

function createMultilineText({
  boldAsLong,
  color,
  fontFamily,
  fontSize,
  fontWeight = 'normal',
  lineHeight,
  maxWidth,
  text,
  x,
  y,
}) {
  const words = text.split(' ')
  const charactersPerLine = Math.round(maxWidth / (fontSize * 0.6))

  const lines = words.reduce((acc, word) => {
    if (!acc.length) {
      acc.push(word)
    } else {
      const currentLine = acc[acc.length - 1]
      if (currentLine.length + word.length < charactersPerLine) {
        acc[acc.length - 1] = `${currentLine} ${word}`
      } else {
        acc.push(word)
      }
    }

    return acc
  }, [])

  return `
    <text x="${x}" y="${y}" fill="${color}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}">
      ${lines
        .map((line, i) => {
          if (i === 0 && boldAsLong && line.startsWith(boldAsLong)) {
            const rest = line.split(boldAsLong, 2)[1]
            return `<tspan x="${x}" dy="0"><tspan font-weight="bold">${boldAsLong}</tspan> ${rest}</tspan>`
          } else {
            return `<tspan x="${x}" dy="${
              i === 0 ? 0 : lineHeight
            }">${line}</tspan>`
          }
        })
        .join('')}
    </text>
  `
}
