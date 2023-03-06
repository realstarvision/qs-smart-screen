import React, { useImperativeHandle, forwardRef, useState } from 'react'
import { Box, DialogTitle, DialogContent, Divider } from '@mui/material'
import Dialog from '@/components/Dialog'
import SvgIcon from '@/components/SvgIcon'
import Stepper from './Stepper'
import RViewerJS from 'react-viewer'
import s from './s.module.scss'

import garbage from '@/assets/image/test/garbage.jpg'

let dialogData: any = {}

function index({}, ref) {
  const [visible, setVisible] = React.useState(false)
  const [data, setData] = useState<any>({})

  useImperativeHandle(ref, () => ({
    handleSetData,
  }))

  function handleSetData(row) {
    setData({ ...row })
    dialogData = row
  }
  return (
    <Dialog open={JSON.stringify(data) !== '{}'} className="dialog" maxWidth="xl">
      <Box className={s.dialogBox}>
        <DialogTitle className={s.dialogTitle}>
          <p>
            <span>事件名称</span> <span>编号：CJ1911</span>
          </p>
          <SvgIcon
            svgName="closeX"
            svgClass={s.closeIcon}
            onClick={() => {
              setData({})
            }}
          ></SvgIcon>
        </DialogTitle>
        <DialogContent className={s.dialogContent}>
          <p className={s.font}>工单处理状态：审批中</p>
          <p className={s.mt + ' ' + s.font}>工单类型：道路施工</p>
          <p className={s.mt + ' ' + s.font}>涉事区域：乔司街道154号</p>
          <p className={s.mt + ' ' + s.font}>工单来源：系统监测预警/人工手动创建</p>
          <p className={s.mt + ' ' + s.font}>工单内容：新的沉降区域出现，请前往现场查看情况！</p>
          <Divider className={s.divider} />
          <p className={s.mt + ' ' + s.font}>当前处理人：某某某</p>
          <p className={s.mt + ' ' + s.font}>任务执行描述：XXXXX</p>
          <p className={s.mt + ' ' + s.font}>
            任务执行照片：
            <img
              src={garbage}
              onClick={() => {
                setVisible(true)
              }}
            />
            <img src={garbage} />
          </p>
          <p className={s.mt + ' ' + s.font}>任务提交时间：2022-08-13 17:00</p>
          <p className={s.mt + ' ' + s.font}>任务审批记录：</p>
          <Stepper
            steps={[
              {
                title: '王五（发起审批）',
                time: '2022-08-13 17:00',
                content: '巡查没做到位，扩大巡查面积',
                type: 1,
              },
              {
                title: '刘洋（已通过）',
                time: '2022-08-13 17:00',
                content: '巡查没做到位，扩大巡查面积',
                type: 1,
              },
              {
                title: '吴哈（待审批）',
                time: '2022-08-13 17:00',
                content: '巡查没做到位，扩大巡查面积',
                type: 2,
              },
              {
                title: '张三（驳回）',
                time: '2022-08-13 17:00',
                content: '巡查没做到位，扩大巡查面积',
                type: 3,
              },
            ]}
          ></Stepper>
        </DialogContent>
      </Box>
      <RViewerJS
        zIndex={10001}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        images={[{ src: garbage }]}
      />
    </Dialog>
  )
}

export default forwardRef(index)
