import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react'
import L from 'leaflet'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { MapContainer, Polygon, WMSTileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import WMSCapabilities from 'wms-capabilities'
// 引入 leaflet.markercluster  聚合插件
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'
// 工具
import { polygonProcess, getCenter } from '@/utils/polygon'
import point_danger from '@/assets/image/point/point_danger.png'
// 样式
import './style.scss'

interface WMS {
  work_spaces: ''
  layers: ''
  id: 0
}

/* 图标 */
function Icon(iconUrl, iconSize) {
  return L.icon({
    iconUrl: iconUrl,
    // iconSize: [40, 30],
    popupAnchor: [0, -20],
    iconSize: iconSize,
  })
}

/* 文字 */
function DivIcon(label, iconSize = 30) {
  return L.divIcon({
    html: label,
    className: 'my-div-icon',
    iconSize: iconSize,
  })
}

// 定义聚合点
let markers = null

/**  map组件  **/
const index = (
  {
    onMarkerClick,
    DSMHeightPoint = [],
    markerList = [],
    polygonList = [],
    checkedPoint = null,
    communityOrRegionVisible,
  }: {
    active?: number
    onMarkerClick?: Function
    coordinates?: any
    enterQS?: boolean
    markerList?: Array<any>
    polygonList?: Array<any>
    DSMHeightPoint?: Array<any>
    checkedPoint?: any
    communityOrRegionVisible?: {
      community: boolean
      region: boolean
    }
  },
  ref
) => {
  const dispatch = useDispatch()
  let dangerLevel = useSelector((state: { dangerLevel }) => state.dangerLevel.value)
  const map = useRef(null)
  const streetTiff = useRef(null)
  const wmsControler = useRef(null)
  const terrainClassificationRef = useRef(null)
  // 初始化geoserver原始数据
  const [capabilities, setCapabilities] = useState(null)
  // const minimap = useMap()
  const [optionsData, setOptionsData] = useState({})
  // 地物分类
  let terrainClassificationActive = useSelector(
    (state: { terrainClassificationActive }) => state.terrainClassificationActive.value
  )
  // redux获取未读消息数据
  let wms = useSelector(({ wms }) => wms.value)
  // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
  useImperativeHandle(ref, () => ({
    handleClearPolygon: (id) => {
      optionsData[id].forEach((polygon) => {
        map.current.removeLayer(polygon)
      })
      optionsData[id] = []
      setOptionsData({ ...optionsData })
    },
    SetZoom,
    handleMarkerCenter,
    wmsPositioning,
  }))

  /* 初始化  */
  useEffect(() => {
    // 获取初始化geoserver原始数据
    const callback = async () => {
      let response
      for (let i = 0; i < 5; i++) {
        response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/geoserver/wms/?service=wms&version=1.1.0&request=GetCapabilities`
        )
        if (response) {
          setCapabilities(response)
          return false
        }
      }
    }

    callback()
  }, [])

  // 监听点位列表和选中的点位
  useEffect(() => {
    if (map.current) {
      // 如果点位列表发生变化并且有数据的时候先清空聚合点位再去添加
      if (markerList.length > 0 || polygonList.length > 0) {
        if (!markers) {
          markers = L.markerClusterGroup()
        } else {
          markers.clearLayers()
        }
        markerList.map((item) => {
          markers.addLayer(createMarker(item))
        })
        // 完成点击进入详情的时候清除点位显示多边形
        if (!checkedPoint) {
          polygonList.map((item) => {
            // 添加点位到聚合
            markers.addLayer(createMarker(item))
          })
        } else if (checkedPoint && polygonList.length > 0) {
          if (markers) {
            markers.clearLayers()
          }
        }
        map.current.addLayer(markers)
      } else {
        // 点位列表没有数据的时候清空聚合点位
        if (markers) {
          markers.clearLayers()
        }
      }
    }
  }, [markerList, checkedPoint])

  // 给标记添加事件
  function createMarker(item) {
    let marker = L.marker(item.coordinates.length > 1 ? item.coordinates : getCenter(item.coordinates[0]), {
      icon: Icon(item.icon, item.iconSize),
    })
    let html = `  
      <span>名称：${item.code}</span>
      <span>地址：${item.position}</span>`
    // 鼠标移入
    marker.on('mouseover', (e) => {
      //添加文字的方法
      marker.bindPopup(html, { closeButton: false, minWidth: 90, className: 'marker_popup' }).openPopup()
    })
    // 鼠标移出
    marker.on('mouseout', (e) => {
      marker.closePopup()
    })
    // 鼠标点击
    marker.on('click', () => handleMarkerClick(item))
    // 返回标记
    return marker
  }

  /* 监听乔司全局唤醒 */
  // useEffect(() => {
  //   if (!enterQS) {
  //     if (map.current) {
  //       console.log(2222)

  //       map.current.flyTo([30.357607839433694, 120.26355743408205], 12)
  //     }
  //     // dispatch(setWms({ work_spaces: '', layers: '', id: 0 }))
  //   } else {
  //     fitWMSBounds(map.current, 'qs_group_cut', capabilities)
  //   }
  // }, [enterQS])

  /* 监听wms参数变化 */
  useEffect(() => {
    if (wms.work_spaces) {
      map.current.on('click', (e) => {
        console.log(e)
      })
      wmsPositioning()
    }
  }, [wms])

  // 定位函数
  function wmsPositioning() {
    wmsControler.current.setParams({
      layers: wms.layers,
      url: `${import.meta.env.VITE_BASE_URL}/geoserver/QS_demo/wms`,
      transparent: true,
      format: 'image/png',
      version: '1.1.0',
      TILED: true,
    })
    fitWMSBounds(map.current, wms.layers, capabilities)
  }

  useEffect(() => {
    if (wmsControler.current) {
      if (!dangerLevel.danger && !dangerLevel.steady && !dangerLevel.fluctuate) {
        wmsControler.current.setOpacity(1)
      } else {
        wmsControler.current.setOpacity(0)
      }
    }
  }, [dangerLevel])

  // 地物切换tiff
  useEffect(() => {
    if (terrainClassificationRef.current) {
      terrainClassificationRef.current.setParams({
        layers: terrainClassificationActive ? terrainClassificationActive.layers : '',
        url: `${import.meta.env.VITE_BASE_URL}/geoserver/QS_demo/wms`,
        transparent: true,
        format: 'image/png',
        version: '1.1.0',
        TILED: true,
      })
      fitWMSBounds(map.current, wms.layers, capabilities)
    }
  }, [terrainClassificationActive])

  /* 监听tab切换 */
  // useEffect(() => {
  //   SetZoom()
  // }, [active])

  /* 设置地图缩放 */
  function SetZoom(place = 'QS_demo:QS_street_tiff') {
    if (map.current) {
      fitWMSBounds(map.current, place, capabilities)
    }
  }

  /* 将地图居中到目标位置 */
  const fitWMSBounds = async (mapEle, layer_name, res) => {
    const json = new WMSCapabilities(res.data).toJSON()
    const layers = json?.Capability?.Layer?.Layer
    const layer = layers?.filter((lay) => lay.Name === layer_name)[0]
    // To get the bounding box of the layer
    const bbox = layer?.LatLonBoundingBox
    mapEle.fitBounds([
      [bbox[1], bbox[0]],
      [bbox[3], bbox[2]],
    ])
  }

  /* 标记鼠标移入 */
  const handleDangerLevelPointMouseover = (e) => {
    e.target.openPopup()
  }

  /* 标记鼠标移出 */
  const handleDangerLevelPointMouseout = (e) => {
    e.target.closePopup()
  }

  /* Marker的点击事件 */
  const handleMarkerClick = (item) => {
    /* 移动至点 */
    handleMarkerCenter(item)
    /* 触发父级点击事件 */
    onMarkerClick(item)
  }

  /* Marker点位居中 */
  const handleMarkerCenter = (item) => {
    /* 移动至点 */
    map.current.flyTo(item.coordinates.length > 1 ? item.coordinates : getCenter(item.coordinates[0]), 17)
  }

  /* 添加多边形图层 */
  function addLayer(latlngs, color) {
    let polygon
    polygon = L.polygon(latlngs, {
      color,
      fillOpacity: 0,
    }).addTo(map.current)
    return polygon
  }
  /* 清除所有图层 */
  function clearLayers() {
    if (map.current) {
      const layers = map.current._layers
      for (let i in layers) {
        if (layers[i]._latlngs) {
          map.current.removeLayer(layers[i])
        }
      }
    }
  }

  return (
    <>
      <MapContainer
        ref={map}
        //@ts-ignore
        center={[30.357607839433694, 120.26355743408205]}
        zoom={13}
        zoomControl={false}
        attributionControl={false}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
        minZoom={11}
      >
        {/* {!enterQS && (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            zIndex={0}
          />
        )} */}
        {/* 沉降标签对应图斑 */}
        {wms.layers && (
          <WMSTileLayer
            ref={wmsControler}
            url={`${import.meta.env.VITE_BASE_URL}/geoserver/QS_demo/wms`}
            // @ts-ignore
            zIndex={2}
            // layers={wms.layers}
            transparent={true}
            format="image/png"
            version="1.1.0"
          />
        )}
        {wms.layers_danger && dangerLevel.danger && (
          <WMSTileLayer
            url={`${import.meta.env.VITE_BASE_URL}/geoserver/QS_demo/wms`}
            // @ts-ignore
            zIndex={2}
            layers={wms.layers_danger}
            transparent={true}
            format="image/png"
            version="1.1.0"
          />
        )}
        {wms.layers_steady && dangerLevel.steady && (
          <WMSTileLayer
            url={`${import.meta.env.VITE_BASE_URL}/geoserver/QS_demo/wms`}
            // @ts-ignore
            zIndex={2}
            layers={wms.layers_steady}
            transparent={true}
            format="image/png"
            version="1.1.0"
          />
        )}
        {wms.layers_fluctuate && dangerLevel.fluctuate && (
          <WMSTileLayer
            url={`${import.meta.env.VITE_BASE_URL}/geoserver/QS_demo/wms`}
            // @ts-ignore
            zIndex={2}
            layers={wms.layers_fluctuate}
            transparent={true}
            format="image/png"
            version="1.1.0"
          />
        )}
        {/* 地物分类 */}
        {terrainClassificationActive && (
          <WMSTileLayer
            // @ts-ignore
            layers={terrainClassificationActive.layers}
            ref={terrainClassificationRef}
            // layers={echartTabs[terrainClassificationActive].layers}
            url={`${import.meta.env.VITE_BASE_URL}/geoserver/QS_demo/wms`}
            transparent={true}
            format="image/png"
            version="1.1.0"
          />
        )}
        {/* 乔司底图 */}
        <WMSTileLayer
          ref={streetTiff}
          url={`${import.meta.env.VITE_BASE_URL}/geoserver/QS_demo/wms`}
          // @ts-ignore
          layers="qs_group_cut"
          transparent={true}
          format="image/png"
          version="1.1.0"
          zIndex={1}
        />
        {/* 多边形点位 polygonList */}
        {checkedPoint &&
          polygonList.map((item, index) => (
            <Polygon
              key={item.id}
              positions={item.coordinates}
              pathOptions={{ color: item.color }}
              eventHandlers={{
                mouseover: handleDangerLevelPointMouseover,
                mouseout: handleDangerLevelPointMouseout,
                click: (e) => handleMarkerClick(item),
              }}
            >
              <Popup
                // @ts-ignore
                minWidth={90}
                closeButton={false}
                className="marker_popup"
              >
                <span>名称：{item.code}</span>
                <span>地址：{item.position}</span>
              </Popup>
            </Polygon>
          ))}
        {/* 社区范围和管理区域 */}
        {
          <>
            {communityOrRegionVisible.community && (
              <>
                <Polygon
                  positions={[
                    [
                      [30.33236106856479, 120.27634620666505],
                      [30.338620743756692, 120.27634620666505],
                      [30.338620743756692, 120.28643131256105],
                      [30.33236106856479, 120.28643131256105],
                    ],
                  ]}
                  pathOptions={{ color: '#34E7FF' }}
                ></Polygon>
                <Marker
                  position={getCenter([
                    [30.33236106856479, 120.27634620666505],
                    [30.338620743756692, 120.27634620666505],
                    [30.338620743756692, 120.28643131256105],
                    [30.33236106856479, 120.28643131256105],
                  ])}
                  // @ts-ignore
                  icon={DivIcon('社区A', 50)}
                ></Marker>
              </>
            )}
            {communityOrRegionVisible.region && (
              <>
                <Polygon
                  positions={[
                    [
                      [30.36413681554502, 120.25205612182619],
                      [30.37154226650744, 120.25205612182619],
                      [30.37154226650744, 120.2663040161133],
                      [30.36413681554502, 120.2663040161133],
                    ],
                  ]}
                  pathOptions={{ color: '#066AE0' }}
                ></Polygon>
                <Marker
                  position={getCenter([
                    [30.36413681554502, 120.25205612182619],
                    [30.37154226650744, 120.25205612182619],
                    [30.37154226650744, 120.2663040161133],
                    [30.36413681554502, 120.2663040161133],
                  ])}
                  // @ts-ignore
                  icon={DivIcon('区域A', 50)}
                ></Marker>
              </>
            )}
          </>
        }
        {/* DSM模型标记高度的点位 */}
        {DSMHeightPoint.map((item) => (
          <Marker
            // @ts-ignore
            draggable={false}
            eventHandlers={{
              mouseover: handleDangerLevelPointMouseover,
              mouseout: handleDangerLevelPointMouseout,
            }}
            position={item.coordinates as any}
            icon={Icon(item.icon, item.iconSize)}
          >
            <Popup
              // @ts-ignore
              minWidth={90}
              closeButton={false}
              className="marker_popup"
            >
              <span>名称：{item.code}</span>
              <span>地址：{item.position}</span>
              <span>高度：{item.height}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  )
}

export default forwardRef(index)
