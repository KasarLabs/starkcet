import React, { useState } from 'react'
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
const contractAddress = "0xA627B6407398ADfeA322Bc5B858A05585E35D1de"

const starknetProvider = new starknet.Provider({
  sequencer: {
    network: 'goerli-alpha'
  }
})

const LinkToStarknetTx = (hash) => (
  <div>
    <p>Transaction sent to Starknet!</p>
    <ClickableLink onClick={() => window.open('https://goerli.voyager.online/tx/' + hash)}>
      {`0x${hash.slice(2, 5)}...${hash.substr(hash.length - 3)}`}
    </ClickableLink>
  </div>
);

function Faucet() {
  // const [labelOpen, setLabelOpen] = useState(false);
  const [addressInput, setAddressInput] = useState("")
  const [, , hasWallet, , isConnected, , chainId, , network, , , , , changeNetwork, goodNetwork, beforeContractInteraction] = useWeb3();
  const [, setStep] = useTransaction()

  async function starkcetFaucet() {
    if (addressInput.length !== 66) {
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
    toast.promise(
      tx.wait(),
      {
        pending: 'Transaction is pending \n',
        success: 'Transaction succeeded 👌 \n',
        error: 'Transaction failed 🤯 \n '
      }
    )
    setStep(1)
    const receipt = await tx.wait()
    setStep(2)
    const id = parseInt(receipt.logs[0].data, 16)
    const response = await fetch('https://api-starkcet.kasar.io:4000/hash?id=' + id);
    const data = await response.json()
    toast.info(LinkToStarknetTx(data._res._hash))
    console.log("data received :")
    console.log(data._res._hash)
    setStep(3)
    await starknetProvider.waitForTransaction(data._res._hash)
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
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

const Col = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 1000px) {
    justify-content: center;
  }
`

const ClickableLink = styled.div`
  cursor: pointer;
  color: #fe4e02;
  text-decoration: underline;
  align: center;
`
export default Faucet