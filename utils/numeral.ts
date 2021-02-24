import numeral from 'numeral'

export const formatNullString = (value: string | number): string | number => {
  return value === null ? '--' : value
}

export const formatPrice = (price: number): string => {
  if (price === null) {
    return null
  }
  return numeral(price).format('$0,[.]00')
}

export const formatPercent = (value: number): string => {
  if (value === null) {
    return null
  }
  return numeral(value / 100).format('0[.]0[0]%')
}

export const formatValue = (value: number, large = false): string => {
  if (value === null) {
    return null
  }
  return large ? numeral(value).format('0[.]0a') : numeral(value).format('0,0')
}
