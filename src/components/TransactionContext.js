import React, { useContext, useState } from "react";
import { ethers } from 'ethers';
import { toast } from 'react-toastify';



const TransactionContext = React.createContext()


export function useTransaction() {
    return useContext(TransactionContext);
}

export default function TransactionProvider({ children }) {
    const [tx, setTx] = useState({});
    const [step, setStep] = useState(-1);


    return (
        <TransactionContext.Provider value={[tx, setTx, step, setStep]}>
            {children}
        </TransactionContext.Provider>
    )
}