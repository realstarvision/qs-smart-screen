import earth_surface_name from '@/assets/image/tabs/safety_tabs/earth_surface_name.png'
import earth_surface_name_active from '@/assets/image/tabs/safety_tabs/earth_surface_name_active.png'
import road_name from '@/assets/image/tabs/safety_tabs/road_name.png'
import road_name_active from '@/assets/image/tabs/safety_tabs/road_name_active.png'
import bridge_name from '@/assets/image/tabs/safety_tabs/bridge_name.png'
import bridge_name_active from '@/assets/image/tabs/safety_tabs/bridge_name_active.png'
import area_name from '@/assets/image/tabs/safety_tabs/area_name.png'
import area_name_active from '@/assets/image/tabs/safety_tabs/area_name_active.png'


// 沉降菜单
export let mapTabs = [
  {
    name: earth_surface_name,
    activeName: earth_surface_name_active,
    label: '乔司全域地表沉降',
  },
  {
    name: road_name,
    activeName: road_name_active,
    label: '主要道路桥梁沉降',
  },
  {
    name: bridge_name,
    activeName: bridge_name_active,
    label: '地铁沿线沉降',
  },
  {
    name: area_name,
    activeName: area_name_active,
    label: '重点区域地表沉降',
  },
]

// 沉降瓦图列表
export let wmsList = [
  {
    id: 0,
    work_spaces: 'QS_demo',
    layers: 'QS_demo:QS_3_month_tif',
    layers_danger: 'QS_demo:qs_road_shp_1025',
    layers_steady: 'QS_demo:QS_metro_tiff',
    layers_fluctuate: 'QS_demo:QS_SL3month_tif',
  },
  {
    id: 1,
    work_spaces: 'QS_demo',
    layers: 'QS_demo:qs_road_shp_1025',
    layers_danger: 'QS_demo:qs_group_20221227',
    layers_steady: 'qs_grass_shp',
    layers_fluctuate: 'qs_water_shp',
  },
  {
    id: 2,
    work_spaces: 'QS_demo',
    layers: 'QS_demo:QS_metro_tiff',
  },
  {
    id: 3,
    work_spaces: 'QS_demo',
    layers: 'QS_demo:QS_SL3month_tif',
  }
]



// 内涝详情选项菜单
export let waterloggingTabList = [
  {
    title: 'DOM模型',
    id: 2,
    layers: ''
  },
  {
    title: 'DSM模型',
    id: 0,
    layers: 'QS_demo:test2'
  },
  {
    title: '地物分类',
    id: 1,
    layers: ''
  },
  {
    title: '土壤湿度',
    id: 3,
    layers: 'QS_demo:hsl'
  },
]



