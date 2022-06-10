import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useTokenPageQuery } from '../../../../generated/graphql'
import { parseIfIpfs } from '../../../common/utils/ipfs'
import Layout from '../../../components/Layout'
import FixedSaleBox from '../../../modules/fixed-sale/FixedSaleBox/FixedSaleBox'
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
            <FixedSaleBox
              tokenId={tokenId}
              collectionAddress={collectionAddress}
              ml='auto'
              maxW='container.sm'
              w='full'
            />
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
