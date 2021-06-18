import { useContext } from 'react'
import { Web3Context } from 'web3-hooks'
import MetaMaskParameters from './MetaMaskParameters'
import User from './User'

function Header() {

  const [web3State, login] = useContext(Web3Context);

  return (
    <header className="d-flex row justify-content-between bg-dark text-white px-2 mb-2 pb-3 sticky-top">
      < MetaMaskParameters />
      <div className="col-2">
        <div className="d-flex flex-column align-items-center justify-content-center mt-2">
          <h1 className="display-5 text-center">DsToken App</h1>
          {!web3State.isLogged && (<button type="button" className="btn btn-warning border-secondary fs-4 text-danger m-1" onClick={login}>login MetaMask
          </button>)}
        </div>
      </div>
      <User />
    </header>
  )
}

export default Header
