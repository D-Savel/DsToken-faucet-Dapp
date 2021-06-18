import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'web3-hooks'
import { DsTokenContext } from '../App'


function User() {
  const [web3State] = useContext(Web3Context)
  const dsToken = useContext(DsTokenContext)
  const [, setIsLoading] = useState(false)
  const [, setValue] = useState(0)
  const [tokenBalance, setTokenBalance] = useState(0)


  useEffect(() => {
    // si simpleStorage est pas null alors
    if (dsToken) {
      const GetBalanceOf = async () => {
        try {
          setIsLoading(true)
          const getTokenBalance = await dsToken.balanceOf(web3State.account)
          setTokenBalance(Number(getTokenBalance))
        } catch (e) {
          console.log(e)
        } finally {
          setIsLoading(false)
        }
      }
      const cb = (account, str) => {
        setValue(str)
        if (account.toLowerCase() !== web3State.account.toLowerCase()) {
          GetBalanceOf()
        }
      }
      // ecouter sur l'event DataSet
      GetBalanceOf()
      dsToken.on('Transfer', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        dsToken.off('Transfer', cb)
      }
    }
  }, [dsToken, web3State.account, web3State.isLogged, setIsLoading, setValue])

  return (
    <div className="col-5">
      <div className="d-flex flex-column justify-content-end align-items-center mx-auto mt-1">
        <strong className="fs-4 ">User Info</strong>
        <button type="button" className="btn btn-primary border-secondary ms-auto">Address :{' '}
          {web3State.isLogged ? <span className="fs-6 badge text-dark rounded-pill bg-light">{web3State.account}</span>
            : <span className="fs-6 badge rounded-pill bg-danger">{web3State.account}</span>}
        </button>
        <button type="button" className="btn btn-primary border-secondary ms-auto my-3">Ether Balance :{' '}
          {web3State.provider ? <span className="fs-6 badge text-dark rounded-pill bg-light">{web3State.balance} Ether(s)</span>
            : <span className=" fs-6 badge rounded-pill bg-danger px-3">{web3State.balance}</span>}
        </button>
        <button type="button" className="btn btn-primary border-secondary ms-auto ">DST Token Balance  :{' '}
          {web3State.provider ? <span className="fs-6 badge text-dark rounded-pill bg-light">{tokenBalance} DST</span>
            : <span className=" fs-6 badge rounded-pill bg-danger px-3">{tokenBalance}</span>}
        </button>
      </div>
    </div>
  )
}

export default User
