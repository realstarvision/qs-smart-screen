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
    layers: '',
    details: ['高分辨率DOM数据在城市内涝监测中具有重要的作用，可以提供城市地表纹理和建筑物轮廓的详细信息，帮助识别城市中的易涝区，如建筑物密集区、道路交通枢纽等，这些区域往往是城市内涝的高风险区。可以提供城市建筑物和道路的变化信息，结合降雨和排水系统的数据，实时监测城市内涝情况，及时发现和处理涝情点，减轻城市内涝的风险。根据不同区域的建筑物密集程度和道路情况，可以预测不同区域内涝的程度和影响范围，为内涝预测和防治提供决策支持；结合排水系统的数据，可以优化排水系统的设计和运行，提高排水系统的效率和适应能力。']
  },
  {
    title: 'DSM模型',
    id: 0,
    layers: 'QS_demo:test2',
    details: ['高分辨率DSM数据在城市内涝监测中具有重要的作用，描述了研究区域地形的空间分布，高分辨率的 DSM 能够反映更为微观的地表特征，可用于提取区域坡度、水流方向及坡向等参数，可以提供城市地表高程的详细信息，帮助识别城市中的易涝区，如低洼地区、河道、湖泊、池塘等，以及建筑物密集区、道路交通枢纽等，这些区域往往是城市内涝的高风险区；也可以提供城市地表高程的变化信息，结合降雨和排水系统的数据，实时监测城市内涝情况，及时发现和处理涝情点，减轻城市内涝的风险。根据不同区域的地形和高程，可以预测不同区域内涝的程度和影响范围，为内涝预测和防治提供决策支持；还可以帮助确定城市排水系统的设计方案，包括排水管径、排水井位置和流向等，根据地形和高程的信息，优化排水系统的设计，提高排水系统的效率和适应能力。']
  },
  {
    title: '地物分类',
    id: 1,
    layers: '',
    details: ['土地利用数据在内涝监测中具有重要的作用，主要用于产流下垫面分析，产流计算等，可以帮助识别城市中的易涝区，如低洼地区、河道、湖泊、池塘等，以及建筑物密集区、道路交通枢纽等，这些区域往往是城市内涝的高风险区；同时土地利用数据可以提供不同区域的土地类型和覆盖率信息，根据不同土地类型的水文特征和渗透能力，可以预测不同区域内涝的程度和影响范围。']
  },
  {
    title: '土壤湿度',
    id: 3,
    layers: 'QS_demo:hsl',
    details: ['土壤湿度数据在内涝监测中具有重要的作用，是城市内涝预测和预警的重要指标之一，可以提供土壤的水分含量信息，根据不同土壤类型的渗透能力和水分持有能力，可以预测不同区域内涝的程度和影响范围。也可以监测城市排水系统的运行情况，结合气象数据和降雨数据，可以判断排水系统的瓶颈和故障，及时发现和解决排水系统中的问题，以减轻城市内涝风险，优化城市排水系统、改善地表覆盖、调整土地利用结构等，以减轻内涝风险和提高城市的适应能力。']
  },
]



