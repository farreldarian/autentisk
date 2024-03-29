import { Box, Button, Image, Skeleton, Text } from '@chakra-ui/react'
import { shortenIfAddress } from '@usedapp/core'
import Link from 'next/link'
import { parseIfIpfs } from '../../common/utils/ipfs'
import { useNftMetadata } from '../nft/nft-metadata'

type Props = {
  tokenId: string
  tokenUri: string
  collectionId: string
  collectionName: string
  owner: string
}

export default function FeaturedSection({
  tokenId,
  tokenUri,
  collectionId,
  collectionName,
  owner,
}: Props) {
  const { data: metadata } = useNftMetadata(tokenUri)

  return (
    <section>
      <Box
        paddingY='36'
        justifyContent={'space-evenly'}
        gap={'10'}
        display='flex'
      >
        <Box w={'25%'} maxH={'30%'}>
          <Skeleton isLoaded={!!metadata?.image}>
            {metadata?.image && (
              <Image
                w={'100%'}
                h={'100%'}
                objectFit={'cover'}
                alt='featured-nft'
                src={parseIfIpfs(metadata!.image)}
              />
            )}
          </Skeleton>
        </Box>

        <Box
          minH={'full'}
          border={'1px'}
          borderColor={'black'}
          bgColor={'black'}
        />

        <Box
          display='flex'
          justifyContent={'space-between'}
          flexDir={'column'}
          gap='4'
        >
          <Text fontSize={'9xl'}>{metadata?.name}</Text>

          <Box display={'flex'} justifyContent='space-between'>
            <Box gap={'3'} display='flex' flexDir={'column'}>
              <Text color={'blackAlpha.500'} fontWeight={'semibold'}>
                Created By
              </Text>

              <a
                href={`https://mumbai.polygonscan.com/address/${owner}`}
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
                  {shortenIfAddress(owner)}
                </Box>
              </a>
            </Box>

            <Box gap={'3'} display='flex' flexDir={'column'}>
              <Text color={'blackAlpha.500'} fontWeight={'semibold'}>
                Collection
              </Text>
              <Link href={`/collection/${collectionId}`} passHref>
                <Box
                  padding={3}
                  borderRadius={'xl'}
                  shadow='lg'
                  cursor={'pointer'}
                  transition='150ms ease-in-out'
                  _hover={{ bg: 'white', shadow: 'xl' }}
                >
                  {collectionName}
                </Box>
              </Link>
            </Box>
          </Box>

          {/* <Box>
            <Text>Current Price</Text>
            <Text fontSize={"5xl"}>{featured.price} ETH</Text>
          </Box> */}

          <Link href={`/collection/${collectionId}/${tokenId}`} passHref>
            <Button colorScheme={'blue'}>View NFT</Button>
          </Link>
        </Box>
      </Box>
    </section>
  )
}
