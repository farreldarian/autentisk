import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { shortenIfAddress } from '@usedapp/core'
import { useMemo } from 'react'
import { HiLogout } from 'react-icons/hi'
interface AccountModalProps {
  isOpen: boolean
  onClose: () => void
  onClick: () => void
  chainId: number
  balance?: string
  account?: string
}

export default function AccountModal({
  isOpen,
  onClose,
  onClick,
  chainId,
  balance,
  account,
}: AccountModalProps) {
  const wrongNetwork = useMemo(() => {
    return chainId !== 4
  }, [chainId])
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Connected with MetaMask{' '}
          {/* <Text fontWeight="normal" fontSize="md">
            on <strong>{ChainId[activeChain?.id]}</strong> network
          </Text> */}
        </ModalHeader>

        <ModalBody
          padding={6}
          width='full'
          justifySelf='center'
          justifyContent='start'
          gap={6}
          display='flex'
          alignItems='center'
        >
          {wrongNetwork ? (
            <Box
              width={2}
              height={2}
              padding={2}
              borderRadius={100}
              bg='#FF3D00'
            />
          ) : (
            <Box
              width={2}
              height={2}
              padding={2}
              borderRadius={100}
              bg='#42FF00'
            />
          )}
          <Box>
            {wrongNetwork ? (
              <Text fontWeight='bold'>Wrong Network !</Text>
            ) : (
              <Text fontWeight='bold'>{balance} ETH</Text>
            )}

            <Text>{shortenIfAddress(account)}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Box width='full'>
            <Button
              justifyContent='space-between'
              width='full'
              onClick={onClick}
            >
              Disconnect <HiLogout />
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
