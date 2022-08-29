import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { shortenIfAddress } from '@usedapp/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import NextLink from 'next/link'
import { SiIpfs } from 'react-icons/si'
import { useTokenPageQuery } from '../../../../generated/graphql'
import { parseIfIpfs } from '../../../common/utils/ipfs'
import Layout from '../../../components/Layout'
import FixedSaleBox from '../../../modules/fixed-sale/FixedSaleBox/FixedSaleBox'
import { useNftMetadata } from '../../../modules/nft/nft-metadata'
import NFTHistorySection from '../../../modules/nft/NFTHistorySection'

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

        <Box
          p={{ base: '6', md: '12', lg: '24' }}
          maxW={{ base: 'container.md', lg: 'container.xl' }}
          mx='auto'
        >
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: '6', md: '12', lg: '24' }}
          >
            <Flex flexDir={'column'} alignItems='start' gap='6'>
              <Heading>{metadata?.name}</Heading>

              <Flex gap='6'>
                <VStack alignItems={'start'}>
                  <Text>Owned by</Text>

                  <a
                    href={`https://mumbai.polygonscan.com/address/${data?.token?.owner.id}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Box
                      padding={3}
                      borderRadius={'xl'}
                      shadow='lg'
                      cursor={'pointer'}
                      transition='150ms ease-in-out'
                      _hover={{ bg: 'white', shadow: 'xl' }}
                    >
                      {shortenIfAddress(data?.token?.owner.id)}
                    </Box>
                  </a>
                </VStack>

                <Box borderLeft={'1px'} borderColor='gray.200'></Box>

                <VStack alignItems={'start'}>
                  <Text>Collection</Text>

                  <NextLink
                    href={`/collection/${data?.token?.collection.id}`}
                    passHref
                  >
                    <Box
                      padding={3}
                      borderRadius={'xl'}
                      shadow='lg'
                      cursor={'pointer'}
                      transition='150ms ease-in-out'
                      _hover={{ bg: 'white', shadow: 'xl' }}
                    >
                      {data?.token?.collection.name}
                    </Box>
                  </NextLink>
                </VStack>
              </Flex>
            </Flex>

            <FixedSaleBox
              tokenId={tokenId}
              collectionAddress={collectionAddress}
              w='full'
            />
          </Grid>

          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: '6', md: '12', lg: '24' }}
            mt='12'
          >
            <Box>
              <Heading size='lg'>Description</Heading>
              <Divider mt='3' />

              <Text mt='3'>{metadata?.description}</Text>

              <Heading size='lg' mt={{ base: '6', lg: '12' }}>
                Details
              </Heading>
              <Divider mt='3' />

              <Flex flexDir={'column'} alignItems='start' mt='6' gap='3'>
                <Button
                  as='a'
                  href={`https://mumbai.polygonscan.com/token/${collectionAddress}?a=${tokenId}`}
                  target='_blank'
                  variant={'ghost'}
                  colorScheme='blackAlpha'
                  leftIcon={
                    <Image
                      objectFit='contain'
                      width={'24px'}
                      height={'24px'}
                      alt='polygon-icon'
                      src={require('/public/polygon-matic-logo.png')}
                    />
                  }
                >
                  View on explorer
                </Button>

                {data?.token && (
                  <Button
                    as='a'
                    href={parseIfIpfs(data?.token?.uri)}
                    target='_blank'
                    variant={'ghost'}
                    colorScheme='blackAlpha'
                    leftIcon={<SiIpfs size='24' />}
                  >
                    View metadata
                  </Button>
                )}
              </Flex>
            </Box>

            <Box>
              <Heading size='lg'>History</Heading>

              <Divider mt='3' />

              <NFTHistorySection tokenId={`${collectionAddress}-${tokenId}`} />
            </Box>
          </Grid>
        </Box>
      </Box>
    </Layout>
  )
}
