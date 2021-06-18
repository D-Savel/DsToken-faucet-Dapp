import { useContext, useState } from 'react'
import {
  Input,
  InputLeftAddon,
  Center,
  Button,
  Stack,
  Text,
  HStack,
  InputGroup,
  Heading
} from '@chakra-ui/react'

import { ethers } from 'ethers'
import { DsTokenContext } from '../App'

function DsTokenUtils() {
  const dsToken = useContext(DsTokenContext)
  const [utilsTokenBalance, setUtilsTokenBalance] = useState(0)
  const [utilsTotalSupply, setUtilsTotalSupply] = useState('_')
  const [utilsName, setUtilsName] = useState('')
  const [utilsSymbol, setUtilsSymbol] = useState('')
  const [utilsDecimals, setUtilsDecimals] = useState('')
  const [utilsAllowance, setUtilsAllowance] = useState(0)
  const [provAddress, setProvAddress] = useState(ethers.constants.AddressZero)
  const [utilsAddress, setUtilsAddress] = useState(ethers.constants.AddressZero)
  const [ownerAddress, setOwnerAddress] = useState(ethers.constants.AddressZero)
  const [spenderAddress, setSpenderAddress] = useState(ethers.constants.AddressZero)
  const [isLoading, setIsLoading] = useState(false)


  const handleClickGetName = async () => {
    try {
      setIsLoading(true)
      const name = await dsToken.name()
      setUtilsName(name.toString())
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClickGetSymbol = async () => {
    try {
      setIsLoading(true)
      const symbol = await dsToken.symbol()
      setUtilsSymbol(symbol.toString())
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClickGetDecimals = async () => {
    try {
      setIsLoading(true)
      const decimals = await dsToken.decimals()
      setUtilsDecimals(decimals.toString())
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClickGetTotalSupply = async () => {
    try {
      setIsLoading(true)
      const supply = await dsToken.totalSupply()
      setUtilsTotalSupply(supply.toString())
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClickGetTokenBalanceOf = async () => {
    try {
      setIsLoading(true)
      setUtilsAddress(provAddress)
      const totalSupply = await dsToken.balanceOf(utilsAddress)
      setUtilsTokenBalance(totalSupply.toString())
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClickGetAllowance = async () => {
    try {
      setIsLoading(true)
      const allowance = await dsToken.allowance(ownerAddress, spenderAddress)
      setUtilsAllowance(allowance.toString())
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Stack mx="2" spacing={4}>
      <Center border="1px" borderRadius="lg" borderColor="dark" bg="blue" w="600px" color="white" mb="1" p="2">
        <Heading size="xl" >DsToken Faucet</Heading>
      </Center>
      <HStack >
        <Button
          isLoading={isLoading}
          loadingText="Get Balance"
          colorScheme="blue"
          onClick={handleClickGetName}
        >
          Get Token name
        </Button>
      </HStack >
      <HStack>
        <Text as="b" fontSize="20">Token name : {utilsName}</Text>)
      </HStack>
      <HStack>
        <Button
          isLoading={isLoading}
          loadingText="Get Balance"
          colorScheme="blue"
          onClick={handleClickGetSymbol}
        >
          Get Token symbol
        </Button>
      </HStack >
      <HStack>
        <Text as="b" fontSize="20">Token symbol : {utilsSymbol}</Text>)
      </HStack>

      <HStack>
        <Button
          isLoading={isLoading}
          loadingText="Get Balance"
          colorScheme="blue"
          onClick={handleClickGetDecimals}
        >
          Get Decimals
        </Button>
      </HStack >
      <HStack>
        <Text as="b" fontSize="20">Decimals value : {utilsDecimals}</Text>)
      </HStack>

      <HStack>
        <Button
          isLoading={isLoading}
          loadingText="Get Balance"
          colorScheme="blue"
          onClick={handleClickGetTotalSupply}
        >
          Get total supply
        </Button>
      </HStack >
      <HStack>
        <Text as="b" fontSize="20">Total supply: {utilsTotalSupply} DST</Text>)
      </HStack>

      <HStack>
        <Button
          isLoading={isLoading}
          loadingText="Get Balance"
          colorScheme="blue"
          onClick={handleClickGetAllowance}
        >
          Get Allowance
        </Button>
        <InputGroup>
          <InputLeftAddon children="Address owner:" />
          <Input
            w="400px"
            placeholder="Address"
            onChange={(event) => setOwnerAddress(event.target.value)} />
          <InputLeftAddon children="Address spender:" />
          <Input
            w="400px"
            placeholder="Address"
            onChange={(event) => setSpenderAddress(event.target.value)} />
        </InputGroup>
      </HStack >
      <HStack>
        <Text as="b" fontSize="20">Allowance for {spenderAddress} : {utilsAllowance} DST</Text>)
      </HStack>

      <HStack>
        <Button
          isLoading={isLoading}
          loadingText="Get Balance"
          colorScheme="blue"
          onClick={handleClickGetTokenBalanceOf}
        >
          Get Tokens Balance
        </Button>
        <InputGroup>
          <InputLeftAddon children="Address:" />
          <Input
            w="500px"
            placeholder="Address"
            onChange={(event) => setProvAddress(event.target.value)} />
        </InputGroup>
      </HStack >
      <HStack>
        <Text as="b" fontSize="20">Balance of {utilsAddress} : {utilsTokenBalance} DST</Text>)
      </HStack>

    </Stack>
  )
}

export default DsTokenUtils


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
