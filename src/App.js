import React from 'react'
import Dapp from './component/Dapp'
import { useContract } from 'web3-hooks'
import {
  DsTokenAddress,
  DsTokenAbi,
} from './contracts/DsToken'
import {
  FaucetAddress,
  FaucetAbi,
} from './contracts/Faucet'

export const DsTokenContext = React.createContext(null)
export const FaucetContext = React.createContext(null)

function App() {
  const dsToken = useContract(DsTokenAddress, DsTokenAbi)
  const faucet = useContract(FaucetAddress, FaucetAbi)
  return (
    <>
      <FaucetContext.Provider value={faucet}>
        <DsTokenContext.Provider value={dsToken}>
          <Dapp />
        </DsTokenContext.Provider>
      </FaucetContext.Provider>
    </>
  )
}

export default App;

// <DsTokenContext.Provider value={dsToken}>
