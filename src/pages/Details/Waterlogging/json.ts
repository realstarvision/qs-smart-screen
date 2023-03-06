
// 色带值
export let colourStripData = [
  {
    bottom: '25m',
    top: '135m',
  },
  {
    bottom: '',
    top: '',
  },
  {
    bottom: '',
    top: '',
  },
  {
    bottom: '30%',
    top: '10%',
  },
]

// 地物分类下标签
export let echartTabs = [
  {
    id: 8,
    icon: 'building',
    activeIcon: 'building_active',
    label: '全部',
    layers: 'QS_demo:qs_group_20221227',
    waterContentData: {
      chartsData: {
        title: '57',
        data: [
          { value: 20, name: '很好' },
          { value: 17, name: '较好' },
          { value: 9, name: '一般' },
          { value: 8, name: '较差' },
          { value: 3, name: '很差' },
        ],
      },
    },
  },
  {
    id: 5,
    icon: 'forest',
    activeIcon: 'forest_active',
    label: '草地',
    layers: 'qs_grass_shp',
    waterContentData: {
      chartsData: {
        title: '30',
        data: [
          { value: 8, name: '很好' },
          { value: 4, name: '较好' },
          { value: 10, name: '一般' },
          { value: 15, name: '较差' },
          { value: 3, name: '很差' },
        ],
      },
    },
  },
  {
    id: 7,
    icon: 'water',
    activeIcon: 'water_active',
    label: '水体',
    layers: 'qs_water_shp',
    waterContentData: {
      chartsData: {
        title: '90',
        data: [
          { value: 50, name: '很好' },
          { value: 10, name: '较好' },
          { value: 19, name: '一般' },
          { value: 6, name: '较差' },
          { value: 5, name: '很差' },
        ],
      },
    },
  },
  {
    id: 1,
    icon: 'building',
    activeIcon: 'building_active',
    label: '建筑物',
    layers: 'qs_building_shp',
    waterContentData: {
      chartsData: {
        title: '57',
        data: [
          { value: 20, name: '很好' },
          { value: 17, name: '较好' },
          { value: 9, name: '一般' },
          { value: 8, name: '较差' },
          { value: 3, name: '很差' },
        ],
      },
    },
  },
  {
    id: 2,
    icon: 'path',
    activeIcon: 'path_active',
    label: '道路',
    layers: 'water_environment:qs_road_shp',
    waterContentData: {
      chartsData: {
        title: '68',
        data: [
          { value: 10, name: '很好' },
          { value: 15, name: '较好' },
          { value: 20, name: '一般' },
          { value: 15, name: '较差' },
          { value: 8, name: '很差' },
        ],
      },
    },
  },
  {
    id: 3,
    icon: 'soil',
    activeIcon: 'soil_active',
    label: '裸土',
    layers: 'QS_demo:qs_bare_shp',
    waterContentData: {
      chartsData: {
        title: '70',
        data: [
          { value: 35, name: '很好' },
          { value: 11, name: '较好' },
          { value: 10, name: '一般' },
          { value: 10, name: '较差' },
          { value: 4, name: '很差' },
        ],
      },
    },
  },
  {
    id: 4,
    icon: 'grassland',
    activeIcon: 'grassland_active',
    label: '林地',
    layers: 'qs_forest_shp',
    waterContentData: {
      chartsData: {
        title: '120',
        data: [
          { value: 50, name: '很好' },
          { value: 10, name: '较好' },
          { value: 30, name: '一般' },
          { value: 10, name: '较差' },
          { value: 20, name: '很差' },
        ],
      },
    },
  },
  {
    id: 6,
    icon: 'plough',
    activeIcon: 'plough_active',
    label: '耕地',
    layers: 'qs_crop_shp',
    waterContentData: {
      chartsData: {
        title: '48',
        data: [
          { value: 6, name: '很好' },
          { value: 4, name: '较好' },
          { value: 10, name: '一般' },
          { value: 20, name: '较差' },
          { value: 8, name: '很差' },
        ],
      },
    },
  },
]


// 类型
export let hazardLevel = ['全部', '低危险区', '中危险区', '高危险区']


/* 详情 */
export let detailsInfo = [
  [
    '城市用地分类核查利用遥感技术对城市用地进行分类核查，了解城市用地信息，帮助政府进行城市规划分析。利用2021年研究区的遥感数据对研究区进行土地利用分类，其中其中林地面积为1075.631 km^2，灌木面积为4.213km^2，草地面积为23.315 km^2，耕地面积为727.144 km^2，湿地面积为2.853km^2，城区面积为937.767 km^2，裸地面积为354.562km^2，水体面积为256.828km^2。',
    '土壤渗水是指地表水体进入土壤，并在整个剖面上运移的全过程。不同地物类型的土壤特征、植被、建筑......均会对水分渗入产生直接影响，因此同一块地区内地物类型不同其土壤渗水率相差巨大，低渗水率的地物类型地表区域水体运动缓慢容易造成内涝。高渗水率地物类型能快速导流，更快进行水分运动，不容易产生内涝。'
  ],
  [
    '土壤含水量又称土壤墒情，是指作物根系分布层土壤水分的分布状况。土壤水分状况受多种因素的影响,其多少直接影响作物的正常生长、产量、产品质量。对土壤含水量进行监测是推广高效低耗节水技术，实现科学用水和高效用水的关键环节之一。2022年研究区内土壤含水量总体较差，其面积为8506.9266km^2，占总面积的78.27%，与2021年相比，2022年由于高温影响导致研究区内的土壤含水量更低。 通过监测不同地物类型的土壤含水量可以更好的预测出易涝区域！',
    '土壤的水里性质决定了土壤吸水量和透水量的大小和变化，土壤初始含水量的上限大小决定着土壤初始入渗量和初期吸水能力的大小。因此土壤含水量上限小的地区含水张力小，在外界水量增大（如：下雨的情况下）的情况下更易形成内涝区域。'
  ]
]