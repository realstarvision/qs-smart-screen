import React, { useEffect, useRef, useState } from 'react'
import { Box, Fade } from '@mui/material'
import { socketSend, ws, socketOnMessage } from '@/utils/websocket'
import { useDispatch, useSelector } from 'react-redux'
import { setWms, resetWms } from '@/store/module/wms'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
// 组件
import ButtonBox from '../common/ButtonBox'
import Map from '@/components/Map'
import SideModule from './components'
import Menu from './components/Menu'
import CommunityOrRegion from './components/CommunityOrRegion'
import WaterloggingTab from './components/WaterloggingTab'
import KeyAreasTab from './components/KeyAreasTab'
// 详情模块
import WellLid from '../Details/WellLid'
import KeyAreas from '../Details/KeyAreas'
import Garbage from '../Details/Garbage'
import Waterlogging from '../Details/Waterlogging'
// 工具
import { polygonProcess } from '@/utils/polygon'
// 数据及样式
import { wmsList, mapTabs, waterloggingTabList } from './json'
import { DSMHeightPoint } from '@/components/Map/json'
import { roadPoinList, bridgePoinList, keyArea, garbageSorting, wellLid, waterlogging } from '@/components/Map/json'
import { setTerrainClassificationActive } from '@/store/module/terrainClassificationActive'
import { setSwitch } from '@/store/module/switch'
import { setDangerLevel } from '@/store/module/dangerLevel'
import './style.scss'
// 图片

import colour_strip_safety from '@/assets/image/color_bar/colour_strip_safety.png'

export default function index({ place }: { place?: number }) {
  const map = useRef(null)
  // 设置redux值
  const dispatch = useDispatch()
  let dangerLevel = useSelector((state: { dangerLevel }) => state.dangerLevel.value)
  // 菜单选择   0:护民地质安全监测   1:保民降水内涝监测   2:便民垃圾分类监测
  let [active, setActive] = useState(0)
  // 沉降标签切换   0:乔司全域地表沉降   1：主要道路地表沉降   2：桥梁立交地表沉降    3：重点区域地表沉降
  let [mapTabActive, setMapTabActive] = useState(0)
  // 内涝详情标签切换   0:DSM模型   1：地物分类   2：DOM模型    3：土壤湿度
  let [waterloggingActive, setWaterloggingActive] = useState(2)
  // 选中点的信息
  let [checkedPoint, setCheckedPoint] = useState(null)
  // 标记点列表
  let [markerList, setMarkerList] = useState([])
  // polygon列表
  let [polygonList, setPolygonList] = useState([])
  // DSM中高度的点位
  let [DSMPoint, setDSMPoint] = useState([])
  // 社区范围和管理区域的点击状态
  let [communityOrRegionVisible, setCommunityOrRegionVisible] = useState({
    community: false,
    region: false,
  })
  /* 初始化 */
  useEffect(() => {
    // websocket接受信息
    socketOnMessage((data) => {
      // 主要菜单切换状态
      if (data.hasOwnProperty('menuId')) {
        setActive(data.menuId)
      }
      // 沉降模块的切换标签
      if (data.hasOwnProperty('mapTabId')) {
        setMapTabActive(data.mapTabId)
      }
      // 进入详情选中的点数据
      if (data.hasOwnProperty('checkedPoint')) {
        setCheckedPoint(data.checkedPoint)
        if (data.checkedPoint) {
          map.current.handleMarkerCenter(data.checkedPoint)
        }
      }
      // 内涝模块详情内的菜单状态
      if (data.hasOwnProperty('waterloggingActive')) {
        setWaterloggingActive(data.waterloggingActive)
        if (data.waterloggingActive === 0) {
          setDSMPoint(DSMHeightPoint)
        } else {
          setDSMPoint([])
        }
      }
      // 地物模块
      if (data.hasOwnProperty('terrainClassification')) {
        dispatch(setTerrainClassificationActive(data.terrainClassification))
      }
      // 保民降水内涝模块开关状态
      if (data.hasOwnProperty('switchData')) {
        dispatch(setSwitch(data.switchData))
        // 设置点位数
        let list = []
        if (data.switchData.wellLid) {
          list.push(...wellLid)
        }
        if (data.switchData.waterAcreage) {
          list.push(...waterlogging)
        }
        setMarkerList(list)
      }
      // 危险等级六边形的点击后
      if (data.hasOwnProperty('dangerLevel')) {
        dispatch(setDangerLevel(data.dangerLevel))
      }
    })

    // 初始化沉降图斑
    setTimeout(() => {
      dispatch(setWms(wmsList[0]))
    })
  }, [])

  /* 沉降监听六边形点击事件 */
  useEffect(() => {
    // 调用接口获取数据
    // let list = [...keyArea, ...bridgePoinList, ...roadPoinList]
    // let list = []
    // switch (mapTabActive) {
    //   case 0:
    //     list = [...keyArea, ...bridgePoinList, ...roadPoinList]
    //     break
    //   case 1:
    //     list = roadPoinList
    //     break
    //   case 2:
    //     list = bridgePoinList
    //     break
    //   case 3:
    //     list = keyArea
    //     break
    // }
    // let result = []
    // // 危险
    // if (dangerLevel.danger) {
    //   let dangerList = list.filter((item) => {
    //     return item.type === 'danger'
    //   })
    //   result = result.concat(dangerList)
    // }
    // // 波动
    // if (dangerLevel.fluctuate) {
    //   let fluctuateList = list.filter((item) => {
    //     return item.type === 'fluctuate'
    //   })
    //   result = result.concat(fluctuateList)
    // }
    // // 全部未选
    // if (!dangerLevel.fluctuate && !dangerLevel.danger && !dangerLevel.steady && mapTabActive !== 0) {
    //   result = list
    // }
    // // 添加点位
    // setPolygonList(result)
  }, [JSON.stringify(dangerLevel)])

  /* 监听沉降标签切换 */
  useEffect(() => {
    // 全局存储卫星列表数据
    dispatch(setWms(wmsList[mapTabActive]))
    setListData(active, mapTabActive)
  }, [mapTabActive])

  /* 监听菜单切换 */
  useEffect(() => {
    if (active !== 0) {
      dispatch(resetWms())
      setListData(active, 0)
    } else {
      dispatch(setWms(wmsList[mapTabActive]))
      setListData(active, mapTabActive)
    }
  }, [active])

  /* 监听选中点 */
  useEffect(() => {
    if (checkedPoint) {
      if (checkedPoint.type === 'waterlogging') {
        setPolygonList([...waterlogging])
        setMarkerList([])
      } else if (checkedPoint.type === 'wellLid') {
        setMarkerList([...wellLid])
        setPolygonList([])
      }
    } else {
      if (active === 1) {
        setListData(active, 0)
      }
    }
  }, [checkedPoint])

  /* 菜单单击事件 */
  const handleMenuClick = (index) => {
    if (active !== index) {
      // 重置视角
      if (index === 1 || index === 2) {
        map.current.SetZoom()
      }
      // dispatch(reset())
      // dispatch(resetNetworkMonitoring())
      // setActive(index)
      socketSend({ menuId: index })
      // if (index !== 0) {
      //   dispatch(setWms({}))
      // }
    }
  }

  /* 地图上图标点击事件 */
  const handleMarkerClick = (item) => {
    socketSend({ checkedPoint: item })
  }

  /* 沉降标签改变事件 */
  const handleMapTabChange = (index) => {
    socketSend({ mapTabId: index })
  }

  /* 设置标记列表数据 */
  function setListData(menuId, mapTabId) {
    if (menuId === 0) {
      // let list =
      //   mapTabId === 1 ? [...roadPoinList] : mapTabId === 2 ? [...bridgePoinList] : mapTabId === 3 ? [...keyArea] : []
      let list = mapTabId === 3 ? [...keyArea] : []
      setPolygonList(list)
      setMarkerList([])
    } else if (menuId === 1) {
      setMarkerList([...wellLid])
      setPolygonList([...waterlogging])
    } else {
      setMarkerList(garbageSorting)
      setPolygonList([])
    }
  }

  /* 详情页返回 */
  const handleBack = () => {
    if (active === 1) {
      socketSend({ waterloggingActive: 2 })
    }
    // 内涝tiff信息,点位信息
    socketSend({ checkedPoint: null, terrainClassification: null })
    // 重新定位地图视角
    if (active === 0) {
      map.current.wmsPositioning()
    } else {
      map.current.SetZoom()
    }
  }

  /* 内涝详情页标签切换点击事件 */
  const handleWaterloggingTabClick = (index) => {
    socketSend({ waterloggingActive: index })
  }

  return (
    <Box className="main-container">
      {/*place:  0 左边  1 中间   2 右边 */}
      {place === 0 ? (
        <>{!checkedPoint && <SideModule active={active} place={0} mapTabActive={mapTabActive} menuActive={active} />}</>
      ) : place === 1 ? (
        <Box
          className="map-box"
          style={{
            overflow: 'hidden',
          }}
        >
          <Map
            ref={map}
            markerList={markerList}
            polygonList={polygonList}
            onMarkerClick={handleMarkerClick}
            DSMHeightPoint={DSMPoint}
            checkedPoint={checkedPoint}
            communityOrRegionVisible={communityOrRegionVisible}
          ></Map>

          {/* 社区范围和管理区域按钮 */}
          <CommunityOrRegion
            visible={communityOrRegionVisible}
            setVisible={setCommunityOrRegionVisible}
          ></CommunityOrRegion>

          {/* 主菜单和返回按钮 */}
          {!checkedPoint ? (
            <Menu active={active} onMenuClick={handleMenuClick}></Menu>
          ) : (
            <ButtonBox className="back_btn" onClick={handleBack}></ButtonBox>
          )}

          {/* 沉降中的菜单 */}
          <CSSTransition
            in={active === 0 && !checkedPoint}
            timeout={500}
            classNames="fade-translate"
            unmountOnExit={true}
          >
            <KeyAreasTab list={mapTabs} mapTabActive={mapTabActive} onChange={handleMapTabChange}></KeyAreasTab>
          </CSSTransition>

          {/* 沉降的色带 */}
          <CSSTransition in={active === 0} timeout={500} classNames="fade-translate" unmountOnExit={true}>
            <img src={colour_strip_safety} className="colour_strip_safety" />
          </CSSTransition>

          {/* 内涝详情中的菜单 */}
          {checkedPoint && checkedPoint.type === 'waterlogging' && (
            <WaterloggingTab
              list={waterloggingTabList}
              active={waterloggingActive}
              onChange={handleWaterloggingTabClick}
            ></WaterloggingTab>
          )}
        </Box>
      ) : (
        <>{!checkedPoint && <SideModule active={active} place={2} />}</>
      )}

      {/* 沉降 */}
      {/* <CSSTransition key={1} in={active === 0 && checkedPoint} timeout={0} unmountOnExit={true}>
        <KeyAreas
          place={place}
          keyAreaId={checkedPoint.id}
          type={mapTabActive === 0 ? checkedPoint.type : checkedPoint.pointType}
        ></KeyAreas>
      </CSSTransition> */}
      {active === 0 && checkedPoint && (
        <KeyAreas
          place={place}
          keyAreaId={checkedPoint.id}
          type={mapTabActive === 0 ? checkedPoint.type : checkedPoint.pointType}
        ></KeyAreas>
      )}

      {/* 水井 , 水涝 */}
      {active === 1 && checkedPoint && (
        <>
          {checkedPoint.type === 'wellLid' ? (
            <WellLid place={place} wellLidId={checkedPoint.id}></WellLid>
          ) : (
            <Waterlogging place={place} waterloggingId={checkedPoint.id} active={waterloggingActive}></Waterlogging>
          )}
        </>
      )}
      {/* 垃圾分类 */}
      {active === 2 && checkedPoint && <Garbage place={place} garbageId={checkedPoint.id}></Garbage>}
    </Box>
  )
}
