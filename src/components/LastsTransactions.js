import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractAbi from "../utils/abis/contract_abi.json"
import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';
import './style/index.css'

const provider = new ethers.providers.JsonRpcProvider("https://ethereum.publicnode.com");
const contractAddress = "0xA627B6407398ADfeA322Bc5B858A05585E35D1de"

function createData(hash, network, to, time) {
  return { hash, network, to, time };
}

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);

  if (d > 0) return (d + (d === 1 ? " day" : " days"))
  if (h > 0) return h + (h === 1 ? " hour" : " hours")
  if (m > 0) return m + (m === 1 ? " minute" : " minutes")
  if (s > 0) return s + (s === 1 ? " second" : " seconds")
  return null;
}

function LastTxTable(props) {
  const { data } = props;

  // Use the map method to create React components for each element in the lastFiveElements array
  const rows = data.map((element, index) => {
    return (
      createData(element.transactionHash, parseInt(element.topics[3], 16), element.topics[2], element.elapsed)
    );
  });

  return (
    <ResponsiveTable>
      <TableHeader>
        <div>Transaction</div>
        <div>Network</div>
        <div>To</div>
        <div>Time</div>
      </TableHeader>
      {rows.map((row) => (
        <div key={row.hash}>
          <STableRow>
            <ClickableLink data-label="Job Id" onClick={() => window.open('https://etherscan.io/tx/' + row.hash)}>
              {`0x${row.hash.slice(2, 5)}...${row.hash.substr(row.hash.length - 3)}`}
            </ClickableLink>
            <div data-label="Customer Name">
              {'Testnet ' + row.network}
            </div>
            <ClickableLink data-label="Amount" onClick={() => window.open('https://goerli.voyager.online/contract/' + row.to)}>
              {`0x${row.to.slice(2, 5)}...${row.to.substr(row.to.length - 3)}`}
            </ClickableLink>
            <div data-label="Payment Status">
              {row.time + ' ago'}
            </div>
          </STableRow>
        </div>
      ))}
    </ResponsiveTable>
  );
}




export default function LastsTransactions() {
  const [transactions, setTransactions] = useState([]);

  // Set up a polling interval to update the transactions in real-time
  useEffect(() => {
    const interval = setInterval(async () => {
      // Retrieve the last 5 transactions from the smart contract using Ethers.js
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider.getSigner(0),
      );
      const filter = {
        address: contractAddress,
        topics: [
          ethers.utils.id("StarkcetTx(address,bytes32,uint8,uint256)")]
      }
      const currentBlockNumber = await provider.getBlockNumber();
      let events = await contract.queryFilter(filter, (currentBlockNumber - 20000));
      events = events.slice(-5)
      events.reverse()
      for (let event of events) {
        let block = await event.getBlock();
        let timestamp = Math.floor(Date.now() / 1000)
        let elapsed = timestamp - block.timestamp
        event["elapsed"] = secondsToDhms(elapsed);
      }

      // Update the transactions in state
      setTransactions(events);
    }, 3000); // Poll every 3 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {transactions.length > 0 ?
        (
          <LastTxContainer>
            <LastTxTable data={transactions} />
          </LastTxContainer>
        ) :
        (
          <LastTxContainer>
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
          </LastTxContainer>
        )}

    </>
  );
};


const LastTxContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`

const ResponsiveTable = styled.ul`
  padding: 0;
  li {

    border-radius: 3px;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  @media (max-width: 1000px) {
    font-size: 10px;
    div {
      font-size: 10px;
    }
  }
`

const TableHeader = styled.li`
  background-color: #2d2d71;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  div {
    color: #fff;
    width: 25%;
  }
`

const STableRow = styled.li`
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  div {
    width: 25%;
  }
`

const ClickableLink = styled.div`
  cursor: pointer;
  color: #fe4e02;
  text-decoration: underline;
`