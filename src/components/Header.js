import { useState } from "react"
import { ethers } from "ethers"
import { ToastContainer, toast } from 'react-toastify';
import contractAbi from "../utils/abis/contract_abi.json"
import WalletButton from './WalletButton';
import './style/index.css'
import ethLogo from '../assets/kasar_logo.png'
import styled from "styled-components"
import { useWeb3 } from "./Web3Context";


export default function Header() {
  const [labelOpen, setLabelOpen] = useState(false);
  const [address, setAddress, hasWallet, setHasWallet, isConnected, setIsConnected, chainId, setchainID, network, setNetwork, connect, handleChainChanged, handleAccountsChanged, changeNetwork, goodNetwork] = useWeb3();

  return (
    <Main>
      <MainTitle>
        STARK
        <EndTitle>
          CET
        </EndTitle>
      </MainTitle>
      <Navigation>
        <WalletButton />
        <a href="https://kasar.io"><Image src={ethLogo} alt="Avatar" /></a>
      </Navigation>
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  @media (max-width: 1000px) {
    padding: 0px 10px;
  }
`

const MainTitle = styled.h1`
  color: #2d2d71;
  font-weight: 400;
  font-size: 50px;
  @media (max-width: 1000px) {
    font-size: 30px;
  }
`

const EndTitle = styled.span`
  font-weight: 500;
`

const Navigation = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
  @media (max-width: 1000px) {
    gap: 10px;
  }
`

const NetWorkButton = styled.button`
  border: 1px solid gray;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 12px 30px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  :hover {
    background-color: #000;
    color: #fff;
  }
`

const Image = styled.img`
  width: 50px;
  height: 50px;
  @media (max-width: 1000px) {
    width: 35px;
    height: 35px;
  }
`
const Labels = styled.div`
  position: absolute;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: #fff;
  top: 60px;
  right: 70px;
`

const Label = styled.div`
  padding: 10px;
  border-radius: 10px;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    background-color: #000;
    color: #fff;
  }

`