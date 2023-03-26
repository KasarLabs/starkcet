import React, { useContext, useState } from "react";



const TransactionContext = React.createContext()


export function useTransaction() {
    return useContext(TransactionContext);
}

export default function TransactionProvider({ children }) {
    const [step, setStep] = useState(-1);


    return (
        <TransactionContext.Provider value={[step, setStep]}>
            {children}
        </TransactionContext.Provider>
    )
}