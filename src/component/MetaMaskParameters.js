import { useContext } from 'react'
import { Web3Context } from 'web3-hooks'

function MetaMaskParameters() {
  const [web3State] = useContext(Web3Context)
  return (
    <div className=" d-flex flex-column align-items-start justify-content-center border border-dark rounded-3 col-5">
      <div className="pb-4">
        <strong className="fs-4">MetaMask</strong>
        <button type="button" className="btn btn-light border-secondary m-2">is installed{' '}
          {web3State.isMetaMask ? <span className="badge rounded-pill bg-success"> {' '}</span>
            : <span className="badge rounded-pill bg-danger">{' '}</span>}
        </button>
        <button type="button" className="btn btn-light border-secondary m-2 ">is logged{' '}
          {web3State.isLogged ? <span className="badge rounded-pill bg-success"> {' '}</span>
            : <span className="badge rounded-pill bg-danger">{' '}</span>}
        </button>
      </div>
      <div className="py-1">
        <strong className="fs-4" >Network</strong>
        <button type="button" className="btn btn-light border-secondary m-2">Id :{' '}
          {web3State.isLogged ? <span className="badge bg-success">{web3State.chainId}</span>
            : <span className="badge bg-danger">-</span>}
        </button>
        <button type="button" className="btn btn-light border-secondary m-2">Name :{' '}
          {web3State.isLogged ? <span className="badge bg-success fs-6">{web3State.networkName}</span>
            : <span className="badge bg-danger">{web3State.networkName}</span>}
        </button>
      </div>
    </div >
  )
}

export default MetaMaskParameters
