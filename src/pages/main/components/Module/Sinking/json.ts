/* 六边形图片 */
import danger from '@/assets/image/png/hexagon/danger.png'
import steady from '@/assets/image/png/hexagon/steady.png'
import fluctuate from '@/assets/image/png/hexagon/fluctuate.png'
import dangerChecked from '@/assets/image/png/hexagon/danger_checked.png'
import steadyChecked from '@/assets/image/png/hexagon/steady_checked.png'
import fluctuateChecked from '@/assets/image/png/hexagon/fluctuate_checked.png'
export let dangerLevelHexagonList = [
  {
    type: 'fluctuate',
    label: '有波动',
    img: fluctuate,
    checkImg: fluctuateChecked,
    value: '9.06',
  },
  {
    type: 'steady',
    label: '平稳',
    img: steady,
    checkImg: steadyChecked,
    value: '14.85',
  },
  {
    type: 'danger',
    label: '危险',
    img: danger,
    checkImg: dangerChecked,
    value: '6.09',
  },
]



export let list = [
  {
    name: '上升',
    data: [5, 4, 6, 7, 8, 10, 24],
  },
  {
    name: '下降',
    data: [28, 19, 20, 26, 21, 26, 28, 10],
  }
]


// export let line = ['道路', '桥梁', '其它']
export let line = ['上升', '下降']
export let xAxisData = ['2022/1', '2022/3', '2022/4', '2022/5', '2022/7', '2022/9', '2022/11       ']


/* 图表数据 */
export let dangerList = [
  {
    name: '平稳',
    data: [15, 20, 4, 23, 15, 10, 5],
  },
  {
    name: '有波动',
    data: [17, 3, 22, 7, 9, 6, 15],
  },
  {
    name: '危险',
    data: [5, 6, 17, 20, 9, 26, 3],
  },
]

export let dangerLine = ['平稳', '有波动', '危险']
export let xAxisDataDanger = ['2022/1', '2022/3', '2022/4', '2022/5', '2022/7', '2022/9', '2022/11       ']





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
  },
]
export let announcementListData = [
  {
    code: 'SG01',
    custodian: '李XX',
    type: '道路施工',
    time: '2022-10-30',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG02',
    custodian: '李XX',
    type: '道路施工',
    time: '2022-05-23',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG03',
    custodian: '李XX',
    type: '道路施工',
    time: '2022-01-01',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG04',
    custodian: '刘XX',
    type: '道路施工',
    time: '2022-09-20',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG05',
    custodian: '刘XX',
    type: '道路施工',
    time: '2022-10-28',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG06',
    custodian: '刘XX',
    type: '道路施工',
    time: '2022-10-28',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG01',
    custodian: '李XX',
    type: '道路施工',
    time: '2022-10-30',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG02',
    custodian: '李XX',
    type: '道路施工',
    time: '2022-05-23',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG03',
    custodian: '李XX',
    type: '道路施工',
    time: '2022-01-01',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG04',
    custodian: '刘XX',
    type: '道路施工',
    time: '2022-09-20',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG05',
    custodian: '刘XX',
    type: '道路施工',
    time: '2022-10-28',
    title: '乔司预警信息公告',
    announcementType: 0
  }, {
    code: 'SG06',
    custodian: '刘XX',
    type: '道路施工',
    time: '2022-10-28',
    title: '乔司预警信息公告',
    announcementType: 0
  }
]

/* 事件处理情况表格数据 */
export let eventProcessingColumns = [
  {
    key: 'eventType',
    title: '工单名称',
    width: '20.1%'
  }, {
    key: 'personnel',
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
  }, {
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
  // {
  //   width: '3.5rem',
  //   key: 'description',
  //   title: '事件描述'
  // },
]
export let eventProcessingListData = [{
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道杭海路',
  description: '地面沉降预警',
  extent: '1',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道胜桑路',
  description: '地面沉降预警',
  extent: '2',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道胜桑路',
  description: '地面沉降预警',
  extent: '3',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道永玄路',
  description: '地面沉降预警',
  extent: '4',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道博卡路',
  description: '地面沉降预警',
  extent: '1',
  personnel: '城建科刘安',
  state: '审核'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道九华路',
  description: '地面沉降预警',
  extent: '2',
  personnel: '城建科刘安',
  state: '审核'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道杭海路',
  description: '地面沉降预警',
  extent: '1',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道胜桑路',
  description: '地面沉降预警',
  extent: '2',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道胜桑路',
  description: '地面沉降预警',
  extent: '3',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道永玄路',
  description: '地面沉降预警',
  extent: '4',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道博卡路',
  description: '地面沉降预警',
  extent: '1',
  personnel: '城建科刘安',
  state: '审核'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道九华路',
  description: '地面沉降预警',
  extent: '2',
  personnel: '城建科刘安',
  state: '审核'
},
{
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道杭海路',
  description: '地面沉降预警',
  extent: '1',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道胜桑路',
  description: '地面沉降预警',
  extent: '2',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道胜桑路',
  description: '地面沉降预警',
  extent: '3',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道永玄路',
  description: '地面沉降预警',
  extent: '4',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道博卡路',
  description: '地面沉降预警',
  extent: '1',
  personnel: '城建科刘安',
  state: '审核'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道九华路',
  description: '地面沉降预警',
  extent: '2',
  personnel: '城建科刘安',
  state: '审核'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道杭海路',
  description: '地面沉降预警',
  extent: '1',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道胜桑路',
  description: '地面沉降预警',
  extent: '2',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道胜桑路',
  description: '地面沉降预警',
  extent: '3',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道永玄路',
  description: '地面沉降预警',
  extent: '4',
  personnel: '城建科刘安',
  state: '已办结'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道博卡路',
  description: '地面沉降预警',
  extent: '1',
  personnel: '城建科刘安',
  state: '审核'
}, {
  eventType: '预警',
  time: '2022-12-26',
  area: '乔司街道九华路',
  description: '地面沉降预警',
  extent: '2',
  personnel: '城建科刘安',
  state: '审核'
}
]