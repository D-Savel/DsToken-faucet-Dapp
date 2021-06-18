import Header from './Header'
import Footer from './Footer'
import DsTokenUtils from './DsTokenUtils'
import { useContext, useState } from 'react'
import { Web3Context } from 'web3-hooks'
import { ethers } from 'ethers'
import { DsTokenContext } from '../App'
import { FaucetContext } from '../App'
import TokensOffer from './TokensOffer'

function Dapp() {
  const [web3State] = useContext(Web3Context)
  const dsToken = useContext(DsTokenContext)
  const faucet = useContext(FaucetContext)
  const [tokenOwner, setTokenOwner] = useState(ethers.constants.AddressZero)
  const [ethBalance, setEthBalance] = useState(0)
  const [availableTokens, SetAvailableTokens] = useState(0)
  const [tokenBalance, setTokenBalance] = useState(0)
  const [delay, setDelay] = useState(0)
  const [address, setAddress] = useState(ethers.constants.AddressZero)
  const [ethToSend, setEthToSend] = useState(0)
  return (
    <div className="App min-vh-100">
      <div className="">
        <Header />
        <div className="d-flex row justify-content-between mx-1 py-3 ">
          {!web3State.isLogged || web3State.networkName !== 'Kovan' ?
            <alert className="alert alert-danger display-6 text-center px-1">Vous devez vous connecter à MetaMask sur le TestNet Kovan</alert> :
            <>
              <DsTokenUtils />
              <TokensOffer />
            </>
          }
        </div>
        < Footer />
      </div>
    </div>
  )
}

export default Dapp
