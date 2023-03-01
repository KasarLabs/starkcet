import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import loader from '../assets/three-dots.svg'
import styledd from 'styled-components';
import { useTransaction } from "./TransactionContext";




const steps = [
  'Sent to L1',
  'Accepted on L1',
  'Sent to L2',
  'Accepted on L2'
];


export default function HorizontalStepper() {
  const [tx, setTx, step, setStep] = useTransaction()

  return (
    <StepperContainer>
      <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </StepperContainer>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  borderColor: '#000000',
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 17.5,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#000000',
      borderWidth: 2,
      borderRadius: 3,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#000000',
      borderWidth: 2,
      borderRadius: 3,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 3,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#000',
  zIndex: 1,
  color: '#fff',
  width: 35,
  height: 35,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage:
    'linear-gradient( 105deg, #ABABAB, #2d2d71 40%)',
  boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 105deg, #ABABAB, #2d2d71 40%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 110deg, #ABABAB, #2d2d71 40%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {active && <Image src={loader} alt="loading..." />}
      {completed && <Check />}
    </ColorlibStepIconRoot>
  );
}

const Image = styledd.img`
  width: 20px;
  height: 25px;
`

const StepperContainer = styledd.div`
// border-color: black;
// border: 1px solid #eaeaea;
width: 80%;
margin:2%;
margin-top:3%
`