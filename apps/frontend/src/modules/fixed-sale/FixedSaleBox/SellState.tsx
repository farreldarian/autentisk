import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  Text,
} from '@chakra-ui/react'
import { constants } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { useRef, useState } from 'react'
import TxButton from '../../../common/components/TxButton'
import useToast from '../../../common/hooks/useToast'
import {
  ZORA_ASK_ADDRESSES,
  ZORA_ERC721_TRANSFER_HELPER,
} from '../../contracts/addresses'
import useAccountAddress from '../../contracts/useAccountAddress'
import useAddress from '../../contracts/useAddress'
import { useERC721Read } from '../../contracts/useERC721Read'
import { useERC721Write } from '../../contracts/useERC721Write'
import { useZoraAsk } from '../../contracts/useZoraAsk'
import { useZoraModuleManagerRead } from '../../contracts/useZoraModuleManagerRead'
import { useZoraModuleManagerWrite } from '../../contracts/useZoraModuleManagerWrite'

interface Props {
  collectionAddress: string
  tokenId: string
  refetchQuery: () => void
}

export default function SellState(props: Props) {
  const { collectionAddress, tokenId, refetchQuery } = props

  const toast = useToast()
  const accountAddress = useAccountAddress()

  const transferHelperAddress = useAddress(ZORA_ERC721_TRANSFER_HELPER)
  const askAddress = useAddress(ZORA_ASK_ADDRESSES)
  const { data: isApprovedForAll, refetch: refetchIsApprovedForAll } =
    useERC721Read(collectionAddress, 'isApprovedForAll', [
      accountAddress,
      transferHelperAddress,
    ])
  const { data: isModuleApproved, refetch: refetchIsModuleApproved } =
    useZoraModuleManagerRead('isModuleApproved', [accountAddress, askAddress])
  const isReady = isApprovedForAll && isModuleApproved

  const [approveOperatorTx, setApproveOperatorTx] = useState<
    string | undefined
  >()
  const { writeAsync: setApproveForAll, status: approveOperatorStatus } =
    useERC721Write(collectionAddress, 'setApprovalForAll', [])

  const [approveModuleTx, setApproveModuleTx] = useState<string | undefined>()
  const {
    writeAsync: setBatchApprovalForModules,
    status: approveModuleStatus,
  } = useZoraModuleManagerWrite('setBatchApprovalForModules', [])

  async function approveOperator() {
    try {
      const tx = await setApproveForAll({
        args: [transferHelperAddress, accountAddress],
      })
      setApproveOperatorTx(tx.hash)
      tx.wait().then(() => refetchIsApprovedForAll())
      toast({ status: 'success', title: `Submitted transaction` })
    } catch (e) {
      toast({ status: 'error', title: e.error.data.message })
    }
  }

  async function approveModule() {
    try {
      const tx = await setBatchApprovalForModules({
        args: [[askAddress], true],
      })
      setApproveModuleTx(tx.hash)
      tx.wait().then(() => refetchIsModuleApproved())
      toast({ status: 'success', title: `Submitted transaction` })
    } catch (e) {
      toast({ status: 'error', title: e.error.data.message })
    }
  }

  const priceInput = useRef<HTMLInputElement>(null)
  const [createAskTx, setCreateAskTx] = useState<string | undefined>()
  const { writeAsync: createAsk, status: createAskStatus } = useZoraAsk(
    'createAsk',
    []
  )

  async function sell() {
    if (!priceInput.current) throw new Error("Can't find input field")
    const price = priceInput.current.value

    try {
      const tx = await createAsk({
        args: [
          collectionAddress,
          tokenId,
          parseEther(price),
          constants.AddressZero,
          accountAddress,
          0,
        ],
      })
      setCreateAskTx(tx.hash)
      tx.wait(3).then(refetchQuery)
      toast({ status: 'success', title: `Submitted transaction` })
    } catch (e) {
      toast({ status: 'error', title: e.error.data.message })
    }
  }

  return (
    <Flex flexDir={'column'} gap='3'>
      <Text>Sell</Text>
      <InputGroup size='lg'>
        <Input
          disabled={!isReady}
          type='number'
          placeholder='0.0'
          ref={priceInput}
        />

        <InputRightElement width='16'>
          <Tag px='3' py='2'>
            <Text>ETH</Text>
          </Tag>
        </InputRightElement>
      </InputGroup>
      {!isReady && (
        <Text fontSize={'sm'} color='gray.500'>
          Oops, you haven&apos;t approved or set Zora module as operator
        </Text>
      )}
      <Flex gap='3'>
        {!isModuleApproved && (
          <TxButton
            txHash={approveModuleTx}
            status={approveModuleStatus}
            onClick={approveModule}
          >
            Approve Module
          </TxButton>
        )}

        {!isApprovedForAll && (
          <TxButton
            txHash={approveOperatorTx}
            status={approveOperatorStatus}
            onClick={approveOperator}
          >
            Approve Operator
          </TxButton>
        )}

        {isReady && (
          <TxButton
            txHash={createAskTx}
            status={createAskStatus}
            size='lg'
            w='full'
            onClick={sell}
          >
            Sell
          </TxButton>
        )}
      </Flex>
    </Flex>
  )
}
