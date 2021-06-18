import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'web3-hooks'
import {
  Box,
  Center,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'

import { DsTokenContext } from '../App'
import { FaucetContext } from '../App'

function TokensOffer() {

  const [web3State] = useContext(Web3Context)
  const faucet = useContext(FaucetContext)
  const dsToken = useContext(DsTokenContext)
  const [isLoading, setIsLoading] = useState(false)
  const [delay, setDelay] = useState('')
  const [faucetCounter, setFaucetCounter] = useState(0)
  const toast = useToast()

  const handleClickGrabTokens = async () => {
    try {
      setIsLoading(true)
      let tx = await faucet.grabTokens()
      await tx.wait()
      setFaucetCounter(faucetCounter + 1)
      toast({
        title: 'Confirmed transaction',
        description: `Tokens for faucet offer have been credited to your balance\nTransaction hash: ${tx.hash}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (e) {
      if (e.code) {
        toast({
          title: 'Transaction signature denied',
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (faucet) {

      const GetDelay = async () => {
        try {
          setIsLoading(true)
          const delay = await faucet.faucetDelayOf(web3State.account)
          Number(delay) === 0 ? setDelay('Now') : setDelay((new Date(Number(delay) * 1000)).toLocaleString())
        } catch (e) {
          if (e.code === 4001) {
            toast({
              title: 'Transaction signature denied',
              description: e.message,
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          }
          console.log(e)
        } finally {
          setIsLoading(false)
        }
      }
      GetDelay()
    }
  }, [faucet, dsToken, web3State.account, toast, faucetCounter])


  return (

    <Flex flexDirection="column" alignItems="center" m={4} h="300px">
      <Center border="1px" borderRadius="lg" borderColor="dark" bg="blue" w="600px" color="white" mb="1" p="2">
        <Heading size="xl" >DsToken Faucet</Heading>
      </Center>
      <Box display="flex" justifyContent="center" alignItems="center" border="1px"
        borderRadius="lg"
        borderColor="blue"
        w="600px"
        h="180px">
        <VStack   >
          <Text
            as="b"
            fontSize="25"
            fontStyle="bold"
            p="3"
            colorScheme="blue">
            100 DST offer for test every 3 days !
          </Text>
          <Button
            isLoading={isLoading}
            loadingText="Get Tokens"
            colorScheme="blue"
            onClick={handleClickGrabTokens}
            fontSize="20"
          >
            Send me test DST Tokens
          </Button>
        </VStack>
      </Box>
      <Center borderRadius="lg" borderColor="dark" bg="blue" w="600px" color="white" mt="1">
        <Text fontSize="20" as="b" >Delay for next grabing tokens:  {delay}</Text>
      </Center>
    </Flex >
  )
}

export default TokensOffer
