import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Box, DialogTitle, DialogContent } from '@mui/material'
import Dialog from '@/components/Dialog'
import SvgIcon from '@/components/SvgIcon'
import s from './style.module.scss'
import RViewerJS from 'react-viewer'

// 图片
import flow_chart from '@/assets/image/flow/flow_chart.jpg'
import data_flow1 from '@/assets/image/flow/data_flow1.png'
import data_flow2 from '@/assets/image/flow/data_flow2.png'

function index({}, ref) {
  const [data, setData] = useState<any>(0)
  const [visible, setVisible] = React.useState(false)
  useImperativeHandle(ref, () => ({
    handleSetData,
  }))

  function handleSetData(index) {
    setData(index)
  }
  return (
    <Dialog open={data !== 0} className="dialog" maxWidth="xl">
      <Box className={s.flowImageDialog}>
        <DialogTitle className={s.dialogTitle}>
          <span>{'流程图'}</span>
          <SvgIcon
            svgName="closeX"
            svgClass={s.closeIcon}
            onClick={() => {
              setData(0)
            }}
          ></SvgIcon>
        </DialogTitle>
        <DialogContent className={s.dialogContent}>
          {/* <RViewerJS>
            <img src={garbageImg} />
          </RViewerJS> */}

          {data === 1 ? (
            <img
              src={flow_chart}
              onClick={() => {
                setVisible(true)
              }}
              style={{
                cursor: 'pointer',
              }}
            />
          ) : data === 2 ? (
            <>
              <img
                src={data_flow1}
                onClick={() => {
                  setVisible(true)
                }}
                style={{
                  cursor: 'pointer',
                }}
              />
              <img
                src={data_flow2}
                onClick={() => {
                  setVisible(true)
                }}
                style={{
                  cursor: 'pointer',
                }}
              />
            </>
          ) : (
            ''
          )}

          <RViewerJS
            zIndex={10001}
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
            images={data === 1 ? [{ src: flow_chart }] : data === 2 ? [{ src: data_flow1 }, { src: data_flow2 }] : []}
          />
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default forwardRef(index)
