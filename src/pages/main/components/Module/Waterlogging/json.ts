import danger from '@/assets/image/png/hexagon/danger.png'
import steady from '@/assets/image/png/hexagon/steady.png'
import fluctuate from '@/assets/image/png/hexagon/fluctuate.png'
import dangerChecked from '@/assets/image/png/hexagon/danger_checked.png'
import steadyChecked from '@/assets/image/png/hexagon/steady_checked.png'
import fluctuateChecked from '@/assets/image/png/hexagon/fluctuate_checked.png'

export let hexagonList = [
  {
    type: 'fluctuate',
    label: '告警',
    img: fluctuate,
    checkImg: fluctuateChecked,
    value: '18',
  },
  {
    type: 'steady',
    label: '正常',
    img: steady,
    checkImg: steadyChecked,
    value: '472',
  },
  {
    type: 'danger',
    label: '离线',
    img: danger,
    checkImg: dangerChecked,
    value: '10',
  },
]

/* 公告信息表格数据 */
export let announcementColumns = [
  {
    key: 'code',
    title: '公告编号',
    width: '18.8%'
  }, {
    key: 'custodian',
    title: '发布人',
    width: '18.8%'
  }, {
    key: 'type',
    title: '公告类型',
    width: '18.8%',
    style: { color: '#FFD141' }
  }, {
    key: 'time',
    title: '公告时间',
    width: '18.8%'
  }, {
    key: 'title',
    title: '公告标题',
    width: '24.8%',
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  }
]
export let announcementListData = [
  {
    code: 'SG01',
    custodian: '某某某',
    type: '水涝',
    title: '乔司预警信息公告',
    time: '2022-10-30',
    announcementType: 1
  }, {
    code: 'SG02',
    custodian: '某某某',
    type: '水涝',
    title: '乔司预警信息公告',
    time: '2022-10-30',
    announcementType: 1
  }, {
    code: 'SG03',
    custodian: '某某某',
    type: '水涝',
    title: '乔司预警信息公告',
    time: '2022-10-30',
    announcementType: 1
  }, {
    code: 'SG04',
    custodian: '某某某',
    type: '水涝',
    title: '乔司预警信息公告',
    time: '2022-10-30',
    announcementType: 1
  }, {
    code: 'SG05',
    custodian: '某某某',
    type: '水涝',
    title: '乔司预警信息公告',
    time: '2022-10-30',
    announcementType: 1
  }, {
    code: 'SG026',
    custodian: '某某某',
    type: '水涝',
    title: '乔司预警信息公告',
    time: '2022-10-30',
    announcementType: 1
  },
]

/* 事件处理情况表格数据 */
export let eventProcessingColumns = [
  {
    key: 'eventType',
    title: '工单名称',
    width: '20.1%'
  }, {
    key: 'description',
    title: '处理人',
    width: '14%'
  }, {
    key: 'area',
    title: '涉事区域',
    width: '23.9%',
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  },
  {
    key: 'time',
    title: '发生时间',
    width: '14%'
  }, {
    key: 'extent',
    title: '紧急程度',
    width: '14%'
  }, {
    key: 'state',
    title: '状态',
    width: '14%',
  },
]

export let eventProcessingListData = [
  {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道航海路',
    description: '城建科刘安',
    extent: '1',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道永玄路',
    description: '城建科刘安',
    extent: '1',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道胜桑路',
    description: '城建科刘安',
    extent: '2',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道九华路',
    description: '城建科刘安',
    extent: '3',
    personnel: '城建科刘安',
    state: '审核中'
  },
  {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道科城街',
    description: '城建科刘安',
    extent: '4',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道三卫路',
    description: '城建科刘安',
    extent: '3',
    personnel: '城建科刘安',
    state: '审核中'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道航海路',
    description: '城建科刘安',
    extent: '1',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道永玄路',
    description: '城建科刘安',
    extent: '1',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道胜桑路',
    description: '城建科刘安',
    extent: '2',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道九华路',
    description: '城建科刘安',
    extent: '3',
    personnel: '城建科刘安',
    state: '审核中'
  },
  {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道科城街',
    description: '城建科刘安',
    extent: '4',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道三卫路',
    description: '城建科刘安',
    extent: '3',
    personnel: '城建科刘安',
    state: '审核中'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道航海路',
    description: '城建科刘安',
    extent: '1',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道永玄路',
    description: '城建科刘安',
    extent: '1',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道胜桑路',
    description: '城建科刘安',
    extent: '2',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道九华路',
    description: '城建科刘安',
    extent: '3',
    personnel: '城建科刘安',
    state: '审核中'
  },
  {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道科城街',
    description: '城建科刘安',
    extent: '4',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道三卫路',
    description: '城建科刘安',
    extent: '3',
    personnel: '城建科刘安',
    state: '审核中'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道航海路',
    description: '城建科刘安',
    extent: '1',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道永玄路',
    description: '城建科刘安',
    extent: '1',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道胜桑路',
    description: '城建科刘安',
    extent: '2',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道九华路',
    description: '城建科刘安',
    extent: '3',
    personnel: '城建科刘安',
    state: '审核中'
  },
  {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道科城街',
    description: '城建科刘安',
    extent: '4',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道三卫路',
    description: '城建科刘安',
    extent: '3',
    personnel: '城建科刘安',
    state: '审核中'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道航海路',
    description: '城建科刘安',
    extent: '1',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道永玄路',
    description: '城建科刘安',
    extent: '1',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道胜桑路',
    description: '城建科刘安',
    extent: '2',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道九华路',
    description: '城建科刘安',
    extent: '3',
    personnel: '城建科刘安',
    state: '审核中'
  },
  {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道科城街',
    description: '城建科刘安',
    extent: '4',
    personnel: '城建科刘安',
    state: '已办结'
  }, {
    eventType: '预警',
    time: '2022-12-26',
    area: '乔司街道三卫路',
    description: '城建科刘安',
    extent: '3',
    personnel: '城建科刘安',
    state: '审核中'
  },

]




/* 事件处理趋势图表 */
export let list = [
  {
    name: '总事件',
    data: [150, 230, 224, 218, 135, 147, 260],
  },
  {
    name: '已处理',
    data: [150, 230, 224, 218, 135, 147, 260],
  }
]
export let line = ['总事件', '已处理',]
export let xAxisData = ['2022/04/01', '', '2022/10/01', '', '2023/04/01', '', '2023/10/01']