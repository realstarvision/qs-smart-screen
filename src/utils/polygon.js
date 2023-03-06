// 获取geojson文件中多个多边形数据
export function polygonProcess(data) {
  let coordinatesArr
  if (data) {
    if (typeof data === 'string') {
      coordinatesArr = JSON.parse(data)[0][0]
    } else {
      coordinatesArr = data[0][0]
    }
  } else {
    return []
  }
  const newCoordinatesArr = []
  for (let i = 0; i < coordinatesArr.length; i++) {
    newCoordinatesArr.push(reverseArray(coordinatesArr[i]))
  }
  return newCoordinatesArr
}

// 反转数组
function reverseArray(data) {
  let newData
  if (data.length > 2) {
    newData = data.slice(0, 2)
  } else {
    newData = data
  }
  return newData.reverse()
}

// 获取多边形的中心点
export function getCenter(pList) {
  let area = 0
  let x = 0
  let y = 0
  for (let i = 1; i <= pList.length; i++) {
    let lat = pList[i % pList.length][0]
    let lng = pList[i % pList.length][1]
    let nextLat = pList[i - 1][0]
    let nextLng = pList[i - 1][1]
    let temp = (lat * nextLng - lng * nextLat) / 2
    area += temp
    x += (temp * (lat + nextLat)) / 3
    y += (temp * (lng + nextLng)) / 3
  }
  x = x / area
  y = y / area
  return [x, y]
}
