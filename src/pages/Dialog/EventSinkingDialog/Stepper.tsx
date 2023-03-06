import React, { useEffect } from 'react'
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
// import Stepper from '@material-ui/core/Stepper'
// import Step from '@material-ui/core/Step'
// import StepLabel from '@material-ui/core/StepLabel'
// import StepContent from '@material-ui/core/StepContent'
// import Button from '@material-ui/core/Button'
// import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
// import PropTypes from 'prop-types'
import SvgIcon from '@/components/SvgIcon'
import s from './s.module.scss'

export default function VerticalLinearStepper({ steps = [] }) {
  // const classes = useStyles()
  // const [activeStep, setActiveStep] = React.useState(0)

  return (
    <div className={s.stepper}>
      <Stepper activeStep={steps.length} orientation="vertical">
        {steps.map((item, index) => (
          <Step key={index} expanded={true}>
            <StepLabel icon={<QontoStepIcon type={item.type} />}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{item.title}</span>
                <span className={s.time}>{item.time}</span>
              </div>
            </StepLabel>
            <StepContent>
              <span className={s.label}>{item.content}</span>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

// 1 通过   2 审核   3 拒绝
function QontoStepIcon({ type }) {
  return (
    <SvgIcon
      svgName={type === 1 ? 'stepper_pass' : type === 2 ? 'stepper_examine' : 'stepper_reject'}
      svgClass={s.step_icon}
    ></SvgIcon>
  )
}
