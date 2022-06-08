import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import { constants } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { FormEvent } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useTokenPageQuery } from '../../../../generated/graphql'
import useToast from '../../../common/hooks/useToast'
import { parseIfIpfs } from '../../../common/utils/ipfs'
import Layout from '../../../components/Layout'
import { ZORA_ERC721_TRANSFER_HELPER } from '../../../modules/contracts/addresses'
import { useERC721Read } from '../../../modules/contracts/useERC721Read'
import { useERC721Write } from '../../../modules/contracts/useERC721Write'
import {
  useZoraAsk,
  ZORA_ASK_ADDRESSES,
} from '../../../modules/contracts/useZoraAsk'
import { useZoraModuleManagerRead } from '../../../modules/contracts/useZoraModuleManagerRead'
import { useZoraModuleManagerWrite } from '../../../modules/contracts/useZoraModuleManagerWrite'
import { useNftMetadata } from '../../../modules/nft/nft-metadata'

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

type Query = {
  address: string
  id: string
}

type Props = {
  collectionAddress: string
  tokenId: string
}

export const getStaticProps: GetStaticProps<Props, Query> = ({ params }) => {
  const address = params!.address
  const id = params!.id
  return {
    props: { collectionAddress: address, tokenId: id },
  }
}

export default function TokenPage({ collectionAddress, tokenId }: Props) {
  const [{ data }] = useTokenPageQuery({
    variables: { id: `${collectionAddress}-${tokenId}` },
  })
  const { data: metadata } = useNftMetadata(data?.token?.uri)

  const toast = useToast()

  const { activeChain } = useNetwork()
  const { data: account } = useAccount()

  const { data: isApprovedOperator } = useERC721Read(
    collectionAddress,
    'isApprovedForAll',
    [
      account?.address ?? constants.AddressZero,
      ZORA_ERC721_TRANSFER_HELPER[activeChain?.id ?? 80001],
    ]
  )
  const {
    writeAsync: setBatchApprovalForModules,
    isLoading: isApprovingModule,
  } = useZoraModuleManagerWrite('setBatchApprovalForModules', [])

  const { data: isApprovedModule } = useZoraModuleManagerRead(
    'isModuleApproved',
    [
      account?.address ?? constants.AddressZero,
      // ZORA_ERC721_TRANSFER_HELPER[activeChain?.id ?? 80001],
      ZORA_ASK_ADDRESSES[activeChain?.id ?? 80001],
    ]
  )

  const { writeAsync: _approve, isLoading: isApprovingOperator } =
    useERC721Write(collectionAddress, 'setApprovalForAll', [])
  const { writeAsync: createAsk, isLoading } = useZoraAsk('createAsk', [])

  async function approve() {
    if (!activeChain?.id) {
      toast({ status: 'error', title: 'Not connected' })
      return
    }

    try {
      if (!isApprovedOperator) {
        await _approve({
          args: [
            ZORA_ERC721_TRANSFER_HELPER[activeChain?.id ?? 80001],
            account?.address ?? constants.AddressZero,
          ],
        })
      }

      if (!isApprovedModule) {
        await setBatchApprovalForModules({
          args: [[ZORA_ASK_ADDRESSES[activeChain?.id ?? 80001]], true],
        })
      }
      toast({ status: 'success', title: `Submitted transaction` })
    } catch (e) {
      toast({ status: 'error', title: e.error.data.message })
    }
  }

  async function list(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // @ts-ignore
    const price: string = e.target.price.value

    try {
      await createAsk({
        args: [
          collectionAddress,
          tokenId,
          parseEther(price),
          constants.AddressZero,
          account?.address ?? constants.AddressZero,
          0,
        ],
      })
      toast({ status: 'success', title: `Submitted transaction` })
    } catch (e) {
      toast({ status: 'error', title: e.error.data.message })
    }
  }

  return (
    <Layout>
      <Box my='-20' pt='20'>
        <Box width={'100vw'} height='70vh' bg='gray.100' py='12'>
          <Box w='full' h='full' position='relative'>
            {metadata && (
              <Image
                src={parseIfIpfs(metadata.image)}
                alt='token-image'
                layout='fill'
                objectFit='contain'
                objectPosition={'center'}
              />
            )}
          </Box>
        </Box>

        <Box p='24'>
          <Flex>
            <Heading>{metadata?.name}</Heading>

            <Box
              border='1px'
              rounded='3xl'
              ml='auto'
              w='full'
              maxW={'container.sm'}
              p='6'
              borderColor='gray.300'
            >
              <form onSubmit={list}>
                <Flex gap='3'>
                  <Box flex={'auto'}>
                    <Input
                      type='number'
                      name='price'
                      rounded='xl'
                      step='any'
                      placeholder='0.15 ETH'
                      isDisabled={!(isApprovedOperator && isApprovedModule)}
                    />
                  </Box>

                  {!(isApprovedOperator && isApprovedModule) && (
                    <Button
                      onClick={approve}
                      isLoading={!!isApprovingOperator || !!isApprovingModule}
                    >
                      Approve
                    </Button>
                  )}

                  <Button
                    type='submit'
                    isLoading={isLoading}
                    isDisabled={!(isApprovedOperator && isApprovedModule)}
                  >
                    List
                  </Button>
                </Flex>
              </form>
            </Box>
          </Flex>

          <Box mt='12'>
            <Heading size='lg'>Description</Heading>
            <Divider mt='3' />
            <Text mt='3'>{metadata?.description}</Text>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}
