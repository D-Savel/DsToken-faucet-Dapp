import { useContext } from 'react'
import { Web3Context } from 'web3-hooks'

function User() {
  const [web3State] = useContext(Web3Context)

  return (
    <div className="col-5">
      <div className="d-flex flex-column justify-content-end align-items-center mx-auto">
        <strong className="fs-4 mb-2">User Info</strong>
        <button type="button" className="btn btn-light border-secondary ms-auto">Address :{' '}
          {web3State.isLogged ? <span className="fs-6 badge rounded-pill bg-primary">{web3State.account}</span>
            : <span className="fs-6 badge rounded-pill bg-danger">{web3State.account}</span>}
        </button>
        <button type="button" className="btn btn-light border-secondary ms-auto my-3">Balance :{' '}
          {web3State.provider ? <span className=" fs-6 badge rounded-pill bg-primary">{web3State.balance} Ether(s)</span>
            : <span className=" fs-6 badge rounded-pill bg-danger px-3">{web3State.balance}</span>}
        </button>
      </div>
    </div>
  )
}

export default User
