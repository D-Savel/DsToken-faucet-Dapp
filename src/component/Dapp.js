import Header from './Header'
import Footer from './Footer'
import DsTokenUtils from './DsTokenUtils'
import { useContext } from 'react'
import { Web3Context } from 'web3-hooks'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import TokensOffer from './TokensOffer'

function Dapp() {
  const [web3State] = useContext(Web3Context)

  return (
    <div className="App min-vh-100">
      <div className="">
        <Router>
          <>
            <nav className="navbar navbar-expand-sm navbar-light bg-secondary">
              <ul className="navbar-nav">
                <li><Link to={'/'} className="nav-link"> Faucet </Link></li>
                <li><Link to={'/DsTokenUtils'} className="nav-link">DsToken Utils</Link></li>
              </ul>
            </nav>
            <div className="d-flex row justify-content-between mb-1">
              {!web3State.isLogged || web3State.networkName !== 'Kovan' ?
                <>
                  <Header />
                  <alert className="alert alert-danger display-6 text-center px-1">Vous devez vous connecter à MetaMask sur le TestNet Kovan</alert>
                </> :
                <>
                  <Header />
                  <Switch>
                    <Route exact path='/' component={TokensOffer} />
                    <Route path='/DsTokenUtils' component={DsTokenUtils} />
                  </Switch>
                </>
              }
            </div>
          </>
        </Router>
        < Footer />
      </div >
    </div >
  )
}

export default Dapp
