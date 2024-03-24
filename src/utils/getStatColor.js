import { colorMap } from './constants'

const getStatColor = (num) => {
  let color
  const baseStat = num
  const keys = Object.keys(colorMap).map(Number)
  const closestKey = keys.reduce((prev, curr) => (Math.abs(curr - baseStat) < Math.abs(prev - baseStat) ? curr : prev))
  color = colorMap[closestKey]
  return color
}
export default getStatColor
