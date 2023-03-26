import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import starknet_logo from '../assets/starknet_logo.png'
import contractAbi from "../utils/abis/contract_abi.json"
import { useWeb3 } from "./Web3Context";
import { useTransaction } from "./TransactionContext";
import { toast } from 'react-toastify';
import NetworkSelector from "./NetworkSelector"
import * as starknet from "starknet";
import WalletButton from './WalletButton';


const notifyError = function (text) { toast.error(text); }
const notify = (text) => toast(text);
const tokenOutput = 10;
const network = 'Goerli 1'
const contractAddress = "0x9A0CA850E9c3d2d24b89897529380d731E046eC9"

const starknetProvider = new starknet.Provider({
  sequencer: {
    network: 'goerli-alpha'
  }
})

const LinkToStarknetTx = (hash) => (
  <div>
    <p>Transaction sent to Starknet!</p>
    <ClickableLink onClick={() => window.open('https://testnet.starkscan.co/tx/' + hash)}>
      {`0x${hash.slice(2, 5)}...${hash.substr(hash.length - 3)}`}
    </ClickableLink>
  </div>
);

function Faucet() {
  const [labelOpen, setLabelOpen] = useState(false);
  const [addressInput, setAddressInput] = useState("")
  const [address, setAddress, hasWallet, setHasWallet, isConnected, setIsConnected, chainId, setchainID, network, setNetwork, connect, handleChainChanged, handleAccountsChanged, changeNetwork, goodNetwork, beforeContractInteraction] = useWeb3();
  const [tx, setTx, step, setStep] = useTransaction()

  async function starkcetFaucet() {
    if (addressInput.length != 66) {
      notifyError('Wrong Starknet address!');
      return;
    }
    console.log('Init function ... ')
    setStep(0)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider.getSigner(0),
    );
    let networkId
    network === "Testnet 1" ? networkId = 1 : networkId = 2
    const tx = await contract.starkcetFaucet(addressInput, networkId);
    setStep(1)
    toast.promise(
      tx.wait(),
      {
        pending: 'Transaction is pending \n',
        success: 'Transaction succeeded 👌 \n',
        error: 'Transaction failed 🤯 \n '
      }
    )
    const receipt = await tx.wait()
    setStep(2)
    const id = parseInt(receipt.logs[0].data, 16)
    const response = await fetch('https://api.kasar.io:4000/hash?id=' + id);
    const data = await response.json()
    toast.info(LinkToStarknetTx(data._res._hash))
    console.log("data received :")
    console.log(data._res._hash)
    setStep(3)
    const starknetReceipt = await starknetProvider.waitForTransaction(data._res._hash)
    setStep(4)
  };

  return (
    <FaucetContainer>
      <Col style={{ width: '100%' }}>
        <Image src={starknet_logo} alt="Avatar" />
        <TextField style={{ width: '100%' }} label="Enter Your Starknet Testnet Wallet Address (0x...)" variant="outlined" onChange={(e) => setAddressInput(e.target.value)} />
      </Col>
      <Col>
        <NetworkSelector />
        {hasWallet && isConnected &&
          (
            chainId === goodNetwork ?
              <Button style={{ minWidth: '120px' }} color='primary' variant="contained" onClick={() => { beforeContractInteraction(starkcetFaucet()) }}>Get Tokens</Button> :
              <Button style={{ minWidth: '120px' }} color='error' variant="contained" onClick={() => { changeNetwork() }}>Change Network</Button>
          )
        }
        {hasWallet && !isConnected &&
          <WalletButton />
        }
        {!hasWallet &&
          <WalletButton />
        }
      </Col>
    </FaucetContainer>
  )
}

const Image = styled.img`
  width: 50px;
  height: 50px;
`


const FaucetContainer = styled.div`
  display: flex;
  width: 95%;
  justify-content: space-between;
  gap: 10px;
`

const Col = styled.div`
  display: flex;
  gap: 10px;
`

const ClickableLink = styled.div`
  cursor: pointer;
  color: #fe4e02;
  text-decoration: underline;
  align: center;
`
export default Faucet