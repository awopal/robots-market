import numeral from 'numeral'

const FormatDigit = (text) => {
  const isAllCharactersLegal = (value) => {
    const illegalCharacters = /[^0-9-.,]/
    return !illegalCharacters.test(value)
  }

  if (typeof text === 'string' && !isAllCharactersLegal(text)) {
    text = 0
  }

  const digitCount = 1
  const digitText = digitCount > 0 ? '.' + '00'.repeat(digitCount) : ''

  return numeral(text).format(`0,0${digitText}`)
}

export default FormatDigit