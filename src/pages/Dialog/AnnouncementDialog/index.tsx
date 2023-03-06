import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Box, DialogTitle, DialogContent } from '@mui/material'
import Dialog from '@/components/Dialog'
import SvgIcon from '@/components/SvgIcon'
import s from './style.module.scss'

// 图片
import garbageImg from '@/assets/image/announcement/garbage.jpg'
import subsidence_area from '@/assets/image/announcement/subsidence_area.jpg'
import waterlogging from '@/assets/image/announcement/waterlogging.png'

// 公告内容
let announcementContent = [
  {
    info: '　杭州闻涛路江陵路路口附近，5月8日早上发生一定程度下沉。地面凹陷面积约30平方米，沉降深度约1米。“我们是今天早上6点32分解到群众反映，有一个大约30平方米左右的凹陷，沉降深度大约为1米左右。从水平面看，有一米左右，面积30个平方米。',
    image: subsidence_area,
  },
  {
    info: '17点52分，杭州市气象台将暴雨黄色预警信号升级为暴雨橙色预警信号。预警内容：受对流云团影响，预计今天傍晚到前半夜主城区和钱塘区阴有阵雨或雷雨，部分有短时暴雨，局部大暴雨，请注意防范。据杭州市气象台刚刚通报，过去三小时全市阴有阵雨，较强降雨集中在钱塘区、萧山区北部以及桐庐、富阳、临安、余杭的局部地区，雨量30-60毫米，个别60-80毫米。最大钱塘区河庄街道三联村81毫米，其它地区10毫米以下。',
    image: waterlogging,
  },
  {
    info: '为进一步推进杭州市临平区乔司垃圾分类工作，提升垃圾分类质量，乔司分类办联合镇妇联、城管执法队，组成5人行动小组，对辖区范围内的公共机构、企业及村委开展垃圾分类联合督查。通过加大垃圾分类服务指导和执法检查力度，提升垃圾分类的知晓率和参与度，推进乔司垃圾分类工作落到实处。',
    image: garbageImg,
  },
]

let announcementDialogData: any = {}

function index({}, ref) {
  const [data, setData] = useState<any>({})
  useImperativeHandle(ref, () => ({
    handleSetData,
  }))

  function handleSetData(row) {
    setData({ ...row })
    announcementDialogData = row
  }
  return (
    <Dialog open={JSON.stringify(data) !== '{}'} className="dialog" maxWidth="xl">
      <Box className={s.dialogBox}>
        <DialogTitle className={s.dialogTitle}>
          <span>{announcementDialogData.title}</span>
          <SvgIcon
            svgName="closeX"
            svgClass={s.closeIcon}
            onClick={() => {
              setData({})
            }}
          ></SvgIcon>
        </DialogTitle>
        <DialogContent className={s.dialogContent}>
          <p className={s.mt + ' ' + s.font}>公告区域：乔司</p>
          <p className={s.mt + ' ' + s.font}>公告类型：{announcementDialogData.type}</p>
          <p className={s.mt + ' ' + s.font}>发布人：{announcementDialogData.custodian}</p>
          <p className={s.mt + ' ' + s.font}>公告时间：{announcementDialogData.time}</p>
          <p className={s.mt + ' ' + s.font}>公告内容</p>
          <p className={s.mt10 + ' ' + s.font}>
            {announcementDialogData.announcementType !== undefined &&
              announcementContent[announcementDialogData.announcementType].info}
            <img
              src={
                announcementDialogData.announcementType !== undefined &&
                announcementContent[announcementDialogData.announcementType].image
              }
            />
          </p>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default forwardRef(index)
