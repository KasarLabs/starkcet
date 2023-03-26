import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useWeb3 } from "./Web3Context";



export default function NetworkSelector() {
    const [, , , , , , , , network, setNetwork, ...rest] = useWeb3();

    const handleChange = (event) => {
        setNetwork(event.target.value);
    };

    return (
        <>
            <FormControl style={{ minWidth: '120px' }}>
                <InputLabel>Network</InputLabel>
                <Select
                    value={network}
                    label="Network"
                    onChange={handleChange}

                >
                    <MenuItem value={'Testnet 1'}>Testnet 1</MenuItem>
                    {/* <MenuItem value={'Testnet 2'}>Testnet 2</MenuItem> */} {/* not available yet*/}
                </Select>
            </FormControl>
        </>
    );
}