import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'web3-hooks'
import { ethers } from 'ethers'
import { DsTokenContext } from '../App'

function Donate() {
  const [web3State] = useContext(Web3Context)
  const dsToken = useContext(DsTokenContext)
  const [ethToSend, setEthToSend] = useState(0)
  const [tokenOwner, setTokenOwner] = useState(0)

  // Get TokenOwner address when component is mounted
  useEffect(() => {
    if (dsToken) {
      const getTokenOwner = async () => {
        try {
          const _value = await dsToken.tokenOwner()
          setTokenOwner(_value)
        } catch (e) {
          console.log(e)
        }
      }
      getTokenOwner()
    }
  })

  const handleClickSend = async () => {
    const weiAmount = ethers.utils.parseEther(ethToSend)
    try {
      const tx = await web3State.signer.sendTransaction({
        to: tokenOwner, value: weiAmount
      })
      await tx.wait()
      console.log('MINED')
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <input
        id="ethToSend"
        type="text"
        placeholder="ether ammount"
        value={ethToSend}
        onChange={(event) => setEthToSend(event.target.value)}
      />
      <button onClick={handleClickSend}>send</button>
    </>
  )
}

export default Donate


/*
<p>account: {web3State.account}</p>
        <p>Balance: {web3State.balance}</p>
        <label htmlFor="balanceOf">Balance Of</label>
        <input id="balanceOf" type="text" value={address} placholder="ethereum address" onChange={(event) => setAddress(event.target.value)} />
        <button onClick={handleClickGetBalance}>get balance</button>
        <p> Balance of {address} : {ethBalance} Ether(s)</p>
        <label htmlFor="ethToSend">send Ether(s) to {address}</label>
        <input
          id="ethToSend"
          type="text"
          placeholder="ether ammount"
          value={ethToSend}
          onChange={(event) => setEthToSend(event.target.value)}
        />
        <button onClick={handleClickSend}>send</button>
*/
