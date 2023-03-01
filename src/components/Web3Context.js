import React, { useContext, useState } from "react";
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import contractAbi from "../utils/abis/contract_abi.json"



const Web3Context = React.createContext()
const goodNetwork = 1
const notifyError = function (text) { toast.error(text); }
const notify = (text) => toast(text);
const contractAddress = "0x9A0CA850E9c3d2d24b89897529380d731E046eC9"


export function useWeb3() {
    return useContext(Web3Context);
}

export default function Web3Provider({ children }) {
    const [address, setAddress] = useState(null);
    const [hasWallet, setHasWallet] = useState(window.ethereum ? true : false);
    const [isConnected, setIsConnected] = useState(false);
    const [chainId, setchainID] = useState(1);
    const [network, setNetwork] = useState("Testnet 1");


    if (window.ethereum) {
        window.ethereum.request({ method: 'eth_chainId' }).then(handleChainChanged)
        window.ethereum
            .request({
                method: 'eth_accounts',
            })
            .then(handleAccountsChanged);
    }

    function handleChainChanged(chainId) {
        setchainID(parseInt(chainId, 16))
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });
    }

    async function changeNetwork() {
        try {
            // check if the chain to connect to is installed
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x' + goodNetwork.toString(16) }], // chainId must be in hexadecimal numbers
            });
        } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x1',
                                chainName: 'Ethereum Mainnet',
                                nativeCurrency: {
                                    symbol: 'ETH', // 2-6 characters long
                                    decimals: 18
                                },
                                blockExplorerUrls: ['https://etherscan.io'],
                                rpcUrls: ['https://mainnet.infura.io/v3/'],
                            }
                        ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
            console.error(error);
        }
    }

    function handleAccountsChanged(accounts) {
        const connected = accounts && accounts.length > 0;
        setIsConnected(connected);
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        if (connected) {
            setAddress(accounts[0]);
        } else {
            setAddress(null);
        }
    };


    async function connect() {
        if (window.ethereum) {
            await window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(handleAccountsChanged)
                .catch((err) => {
                    if (err.code === 4001) {
                        // EIP-1193 userRejectedRequest error
                        // If this happens, the user rejected the connection request.
                        toast.info('Please connect to MetaMask.');
                        notifyError('Error connecting : ' + err.message);
                    } else {
                        console.error(err);
                        notifyError('Error connecting : ' + err.message);
                    }
                });
        } else { toast.info('Install MetaMask') }
    };


    async function beforeContractInteraction(callBack) {
        if (!hasWallet) {
            notifyError('You must install MetaMask!')
        }
        if (!isConnected) {
            try {
                await connect();
            } catch (err) {
                toast.error(err.message)
            }
        };
        if (isConnected) {
            try { await callBack }
            catch (err) {
                toast.error(err.message);
                console.log(err.message);
            }
        }
    };


    return (
        <Web3Context.Provider value={[address, setAddress, hasWallet, setHasWallet, isConnected, setIsConnected, chainId, setchainID, network, setNetwork, connect, handleChainChanged, handleAccountsChanged, changeNetwork, goodNetwork, beforeContractInteraction]}>
            {children}
        </Web3Context.Provider>
    )
}