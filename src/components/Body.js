import React from 'react'
import styled from 'styled-components';
import LastsTransactions from "./LastsTransactions"
import Stepper from "./Stepper"
import Faucet from "./Faucet"
import TransactionProvider from './TransactionContext';

function Body() {
  return (
    <BodyContainer>
      <TransactionProvider>
        <Faucet />
        <Stepper />
      </TransactionProvider>
      <LastsTransactions />
    </BodyContainer>
  )
}

const BodyContainer = styled.div`
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  border-radius: 15px;
  border: 3px solid #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0px;
  width:50%;
  max-width:800px;
  z-index: 10;
  @media (max-width: 1000px) {
    width: 90%;
  }
`

export default Body