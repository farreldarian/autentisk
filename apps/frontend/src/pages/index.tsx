import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useHomeQuery } from '../../generated/graphql'
import Layout from '../components/Layout'
import FeaturedSection from '../modules/home/FeaturedSection'
import HomeNftCard from '../modules/home/HomeNftCard'

export default function Home() {
  const [{ data }] = useHomeQuery()

  return (
    <>
      <Head>
        <title>Authentic NFT Marketplace</title>
        <meta name='description' content='AI-Driven NFT Marketplace' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        {data?.featured.at(0) && (
          <FeaturedSection
            collectionId={data.featured[0].collection.id}
            collectionName={data.featured[0].collection.name}
            owner={data.featured[0].owner.id}
            tokenId={data.featured[0].scId}
            tokenUri={data.featured[0].uri}
          />
        )}

        <section>
          <Box padding={'20'} display='flex' flexDir={'column'} gap={'4'}>
            <Text
              fontSize='4xl'
              borderBottom={'1px'}
              w={'full'}
              borderColor={'black'}
              fontWeight={'bold'}
              letterSpacing='widest'
            >
              Explore NFTs
            </Text>

            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
            >
              {data?.tokens.map((token, i) => (
                <HomeNftCard tokenUri={token.uri} key={i} />
              ))}
            </Box>
          </Box>
        </section>
      </Layout>
    </>
  )
}
