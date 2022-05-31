import { Box, Button, Image, Skeleton, Text } from '@chakra-ui/react'
import { shortenIfAddress } from '@usedapp/core'
import Link from 'next/link'
import { useMemo } from 'react'
import { useFeaturedQuery } from '../../../generated/graphql'
import { parseIfIpfs } from '../../common/utils/ipfs'
import { useNftMetadata } from '../nft/nft-metadata'

export default function FeaturedSection() {
  const [{ data: gqlData }] = useFeaturedQuery()
  const featured = useMemo(() => gqlData?.tokens.at(0), [gqlData?.tokens])
  const { data: metadata } = useNftMetadata(featured?.uri)

  if (!featured) return <></>

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

              <Box
                padding={3}
                borderRadius={'lg'}
                boxShadow={'2px 2px 3px black'}
              >
                {shortenIfAddress(featured?.owner.id)}
              </Box>
            </Box>

            <Box gap={'3'} display='flex' flexDir={'column'}>
              <Text color={'blackAlpha.500'} fontWeight={'semibold'}>
                Collection
              </Text>
              {featured.collection && (
                <Link href={`/collection/${featured.collection.id}`} passHref>
                  <Box
                    padding={3}
                    borderRadius={'lg'}
                    boxShadow={'2px 2px 3px black'}
                  >
                    {featured?.collection.name}
                  </Box>
                </Link>
              )}
            </Box>
          </Box>

          {/* <Box>
            <Text>Current Price</Text>
            <Text fontSize={"5xl"}>{featured.price} ETH</Text>
          </Box> */}

          <Button colorScheme={'blackAlpha'} variant={'outline'}>
            View NFT
          </Button>
        </Box>
      </Box>
    </section>
  )
}
