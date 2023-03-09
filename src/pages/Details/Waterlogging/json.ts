
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

