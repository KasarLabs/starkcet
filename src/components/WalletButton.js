import React from 'react'
import Button from '@mui/material/Button';
import { useWeb3 } from "./Web3Context";


export default function WalletButton() {

  const [address, , hasWallet, , isConnected, , chainId, , , , connect, , , changeNetwork, goodNetwork] = useWeb3();
  if (!hasWallet) {
    return (
      <Button
        variant='contained'
        style={{ minWidth: '120px' }}
        sx={{ margin: '0px 10px', color: '#fff', minWidth: '320px' }}
        onClick={() => {
          window.open("https://metamask.io/download/", "_blank");
        }}
      >Install MetaMask</Button>
    )
  }

  if (!isConnected) {
    return (
      <Button
        style={{ minWidth: '120px' }}
        variant='contained'
        onClick={() => { connect() }}
        md={{ fontSize: '10px' }}
      >Connect Wallet</Button>)
  }

  if (chainId !== goodNetwork) {
    return (
      <Button
        variant='contained'
        color='error'
        onClick={() => changeNetwork()}
      >Wrong Network!</Button>)
  }

  return (
    <Button
      sx={{ textTransform: "none" }}
      variant='contained'
      disabled={true}
      onClick={(hasWallet ? connect : () => { })}
    >{`0x${address.slice(2, 5)}...${address.substr(address.length - 3)}`}
    </Button>
  )
}