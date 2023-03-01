import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useWeb3 } from "./Web3Context";



export default function NetworkSelector() {
    const [address, setAddress, hasWallet, setHasWallet, isConnected, setIsConnected, chainId, setchainID, network, setNetwork, connect, handleChainChanged, handleAccountsChanged, changeNetwork, goodNetwork, beforeContractInteraction] = useWeb3();

    const handleChange = (event) => {
        setNetwork(event.target.value);
    };

    return (
        <>
            <FormControl>
                <InputLabel>Network</InputLabel>
                <Select
                    value={network}
                    label="Network"
                    onChange={handleChange}

                >
                    <MenuItem value={'Testnet 1'}>Testnet 1</MenuItem>
                    <MenuItem value={'Testnet 2'}>Testnet 2</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}