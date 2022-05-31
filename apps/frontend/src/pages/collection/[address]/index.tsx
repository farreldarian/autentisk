import { Box, Image, Skeleton, Text } from '@chakra-ui/react'
import { shortenIfAddress } from '@usedapp/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useMemo } from 'react'
import { useCollectionQuery } from '../../../../generated/graphql'
import { parseIfIpfs } from '../../../common/utils/ipfs'
import Layout from '../../../components/Layout'
import NftCard from '../../../components/NftCard'
import { useNftMetadata } from '../../../modules/nft/nft-metadata'

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

type Query = {
  address: string
}

type Props = {
  address: string
}

export const getStaticProps: GetStaticProps<Query, Props> = ({ params }) => {
  const address = params!.address
  return {
    props: { address },
  }
}

export default function CollectionInfo({ address }: Props) {
  const [{ data }] = useCollectionQuery({ variables: { address } })

  const featured = useMemo(
    () => data?.collection?.tokens.at(0),
    [data?.collection?.tokens]
  )
  const { data: metadata } = useNftMetadata(featured?.uri)

  return (
    <Layout>
      <Box my='-20'>
        <Box
          px='14'
          maxW='full'
          display='flex'
          flexDirection='column'
          background={'blackAlpha.400'}
          backgroundBlendMode='overlay'
          py='40'
          backgroundPosition='center'
          backgroundSize='cover'
          backgroundAttachment='fixed'
          backgroundRepeat='no-repeat'
          height='80vh'
          justifyContent='space-between'
          {...(metadata && { backgroundImage: parseIfIpfs(metadata.image) })}
        >
          <Box
            borderWidth='20px'
            backdropFilter='blur(20px)'
            borderColor='transparent'
            borderRadius='2xl'
            width='fit-content'
          >
            {metadata && (
              <Image
                boxSize='150px'
                alt='collectionArt'
                objectFit='cover'
                src={parseIfIpfs(metadata?.image)}
              />
            )}
          </Box>

          <Skeleton isLoaded={!!data?.collection}>
            <Text
              fontWeight={600}
              textShadow='10px 10px black'
              fontSize='8xl'
              letterSpacing='widest'
              color='white'
            >
              {data?.collection?.name}
            </Text>
          </Skeleton>
          <Box
            width='fit-content'
            borderWidth='10px'
            backdropFilter='blur(20px)'
            borderColor='transparent'
            borderRadius='2xl'
          >
            <Skeleton isLoaded={!!data?.collection}>
              <Text fontWeight='bold' fontSize='2xl' color='white'>
                Owner : {shortenIfAddress(data?.collection?.owner.id)}
              </Text>
            </Skeleton>
          </Box>
        </Box>

        <Box
          mt={6}
          py={10}
          px={12}
          maxW='full'
          background='transparent'
          backdropFilter='blur(20px)'
        >
          <Box
            borderRadius='2xl'
            w='fit-content'
            py='6'
            px='12'
            display='flex'
            background='white'
            shadow='lg'
            mt='-28'
            justifyContent='space-evenly'
          >
            <Box>
              <Text>Tokens</Text>
              <Text fontWeight='700'>{data?.collection?.tokens.length}</Text>
            </Box>
          </Box>

          <Box
            display='flex'
            mt={10}
            justifyContent='space-evenly'
            width='full'
          >
            {data?.collection?.tokens.map((token, i) => (
              <NftCard key={i} uri={token.uri} owner={token.owner.id} />
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}
