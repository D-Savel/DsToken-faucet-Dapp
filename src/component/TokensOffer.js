import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'web3-hooks'
import {
  Alert,
  AlertIcon,
  Box,
  Input,
  Badge,
  Center,
  Button,
  Flex,
  Spacer,
  Heading,
  Text,
  HStack,
  VStack,
  Spinner,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { DsTokenContext } from '../App'
import { FaucetContext } from '../App'

function TokensOffer() {

  const [web3State, login] = useContext(Web3Context)
  const faucet = useContext(FaucetContext)
  const dsToken = useContext(DsTokenContext)
  const [value, setValue] = useState('No render')
  const [isLoading, setIsLoading] = useState(false)
  const [delay, setDelay] = useState('')
  const [inputValue, SetInputValue] = useState('')
  const toast = useToast()
  const {
    isOpen: isOpenLogoutModal,
    onOpen: onOpenLogoutModal,
    onClose: onCloseLogoutModal,
  } = useDisclosure()

  // Listen to DataSet event and react with a state change
  useEffect(() => {
    if (dsToken) {
      const cb = (account, str) => {
        setValue(str)
        if (account.toLowerCase() !== web3State.account.toLowerCase()) {
          toast({
            title: 'Event DataSet',
            description: `${account} set storage with value: ${str}`,
            status: 'info',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })
        }
      }
      // ecouter sur l'event DataSet
      dsToken.on('Transfer', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        dsToken.off('Transfer', cb)
      }
    }
  }, [dsToken, web3State.account, toast])

  const handleClickGrabTokens = async () => {
    try {
      setIsLoading(true)
      let tx = await faucet.grabTokens()
      await tx.wait()
      toast({
        title: 'Confirmed transaction',
        description: `Tokens for faucet offer have been credited to your balance\nTransaction hash: ${tx.hash}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
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

  // Get storage value when component is mounted
  useEffect(() => {
    if (faucet) {
      const getValue = async () => {
        try {
          const _value = await faucet.faucetDelay()
          setValue(_value)
        } catch (e) {
          console.log(e)
        }
      }
      getValue()
    }
  }, [faucet])


  useEffect(() => {
    const GetDelay = async () => {
      try {
        setIsLoading(true)
        const value = await faucet.tokenOwner()
        console.log(value)
        setDelay(value)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }
    GetDelay()
  }, [faucet])


  return (
    <>
      <Modal isOpen={isOpenLogoutModal} onClose={onCloseLogoutModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout from a Dapp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You can not logout from a Dapp.</Text>
            <Text>
              Disconnect your MetaMask from this website if you want to logout.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onCloseLogoutModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex flexDirection="column" alignItems="center" m={4} h="300px">
        <Center border="1px" borderRadius="lg" borderColor="dark" bg="blue" w="600px" color="white" p="2">
          <Heading size="xl" >DsToken Faucet</Heading>
        </Center>
        <Box display="flex" justifyContent="center" alignItems="center" border="1px"
          borderRadius="lg"
          borderColor="dark"
          w="600px"
          h="150px">
          <VStack   >
            <Text
              as="b"
              fontSize="25"
              fontStyle="bold"
              p="3"
              colorScheme="blue">
              100 DST offer for test !
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
        <p>getter delay faucet contract:  {value}</p>
        <p>getter Address faucet contract:  {delay}</p>
      </Flex >
    </>
  )
}

export default TokensOffer
