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
    code: 'QS01',
    custodian: '李某某',
    type: '垃圾智能柜',
    sate: '在线',
    time: '2022-09-02',
    abnormal: '无异常',
    area: '乔井路56号',
    title: '智能柜信息公告',
    announcementType: 2
  }, {
    code: 'QS02',
    custodian: '李某某',
    type: '垃圾智能柜',
    sate: '在线',
    time: '2022-09-03',
    abnormal: '无异常',
    area: '乔井路68号',
    title: '智能柜信息公告',
    announcementType: 2
  }, {
    code: 'QS03',
    custodian: '李某某',
    type: '垃圾智能柜',
    sate: '在线',
    time: '2022-09-04',
    abnormal: '无异常',
    area: '乔井路69号',
    title: '智能柜信息公告',
    announcementType: 2
  }, {
    code: 'QS04',
    custodian: '李某某',
    type: '垃圾智能柜',
    sate: '在线',
    time: '2022-09-05',
    abnormal: '无异常',
    area: '乔井路70号',
    title: '智能柜信息公告',
    announcementType: 2
  }, {
    code: 'QS05',
    custodian: '李某某',
    type: '垃圾智能柜',
    sate: '在线',
    time: '2022-09-06',
    abnormal: '无异常',
    area: '乔井路70号',
    title: '智能柜信息公告',
    announcementType: 2
  }, {
    code: 'QS06',
    custodian: '李某某',
    type: '垃圾智能柜',
    sate: '在线',
    time: '2022-09-07',
    abnormal: '无异常',
    area: '乔井路70号',
    title: '智能柜信息公告',
    announcementType: 2
  }, {
    code: 'QS07',
    custodian: '李某某',
    type: '垃圾智能柜',
    sate: '在线',
    time: '2022-09-08',
    abnormal: '无异常',
    area: '乔井路70号',
    title: '智能柜信息公告',
    announcementType: 2
  }, {
    code: 'QS08',
    custodian: '李某某',
    type: '垃圾智能柜',
    sate: '在线',
    time: '2022-09-09',
    abnormal: '无异常',
    area: '乔井路70号',
    title: '智能柜信息公告',
    announcementType: 2
  },
]

export let deviceListColumns = [
  {
    width: '49%',
    key: 'code',
    title: '柜体编号'
  }, {
    width: '51%',
    key: 'state',
    title: '设备状态'
  },
]


/* 视频 */
import video from '@/assets/mp4/1.mp4'

// 图片
import garbage_green from '@/assets/image/point/garbage_green.png'
import garbage_red from '@/assets/image/point/garbage_red.png'

// 垃圾分类
export let garbageSorting = [
  {
    id: 1,
    coordinates: [30.37112, 120.26853],
    code: 'S01',
    address: '乔司社区',
    state: '在线',
    icon: garbage_green,
    type: "normal",
    video: video

  },
  {
    id: 2,
    coordinates: [30.37555, 120.27555],
    code: 'S02',
    address: '新街社区',
    state: '在线',
    icon: garbage_green,
    type: "offline",
    video: video

  }, {
    id: 3,
    coordinates: [30.35222, 120.26555],
    code: 'S03',
    address: '航海路社区',
    state: '在线',
    icon: garbage_green,
    type: "alarm",
    video: video
  },
  {
    id: 4,
    coordinates: [30.35111, 120.28344],
    code: 'S04',
    address: '新街社区',
    state: '离线',
    icon: garbage_red,
    type: "offline",
    video: video
  },
  {
    id: 5,
    coordinates: [30.34666, 120.28855],
    code: 'S05',
    address: '新街社区',
    state: '离线',
    icon: garbage_red,
    type: "offline",
    video: video
  }, {
    id: 6,
    coordinates: [30.34886, 120.26999],
    code: 'S06',
    address: '新街社区',
    state: '离线',
    icon: garbage_red,
    type: "offline",
    video: video
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
export let xAxisData = ['', '2022/09/01', '', '2022/09/15', '', '2022/09/30', '']