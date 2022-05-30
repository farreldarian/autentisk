import { Box, Image, Text } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import NftCard from '../../components/NftCard'

const collectionData = {
  collectionName: 'COLLAB LAB',
  owner: '@hoizon',
  contractAddress: '0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3',
  nfts: [
    {
      name: 'The Banished Beauty',
      author: '@hoizon',
      owner: '@edwinfernaldy',
      status: 'sold',
      price: '0.40',
      image:
        'https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/1/nft.png?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680',
    },
    {
      name: 'Respect',
      author: '@hoizon',
      owner: '@farreldarian',
      status: 'onsale',
      price: '0.32',
      image:
        'https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/2/nft.png?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680',
    },
    {
      name: 'DreamScape',
      author: '@hoizon',
      owner: '@edricktio',
      status: 'onsale',
      price: '0.80',
      image:
        'https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/3/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680',
    },
  ],
}

export default function CollectionInfo({}) {
  return (
    <Layout>
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
        height='100vh'
        justifyContent='space-between'
        backgroundImage={collectionData.nfts[2].image}
      >
        <Box
          borderWidth='20px'
          backdropFilter='blur(20px)'
          borderColor='transparent'
          borderRadius='2xl'
          width='fit-content'
        >
          <Image
            boxSize='150px'
            alt='collectionArt'
            objectFit='cover'
            src={collectionData.nfts[0].image}
          />
        </Box>
        <Text
          fontWeight={600}
          textShadow='10px 10px black'
          fontSize='8xl'
          letterSpacing='widest'
          color='white'
        >
          {collectionData.collectionName}
        </Text>
        <Box
          width='fit-content'
          borderWidth='10px'
          backdropFilter='blur(20px)'
          borderColor='transparent'
          borderRadius='2xl'
        >
          <Text fontWeight='bold' fontSize='2xl' color='white'>
            Owner : {collectionData.owner}
          </Text>
        </Box>
      </Box>

      <Box
        mt={6}
        py={10}
        px={8}
        maxW='full'
        background='transparent'
        backdropFilter='blur(20px)'
      >
        <Box
          backdropFilter='blur(20px)'
          borderRadius='2xl'
          padding={6}
          maxWidth='50%'
          display='flex'
          textColor='Black'
          background='white'
          boxShadow='4px 4px 10px black'
          mt='-28'
          justifyContent='space-evenly'
        >
          <Box pr='10' borderRight='2px'>
            <Text>Collection of</Text>
            <Text fontWeight='700'>3</Text>
          </Box>

          <Box pr='10' borderRight='2px'>
            <Text>Owned by</Text>
            <Text fontWeight='700'>1</Text>
          </Box>

          <Box pr='10' borderRight='2px'>
            <Text>Floor price</Text>
            <Text fontWeight='700'>0.32</Text>
          </Box>

          <Box>
            <Text>Total Sales</Text>
            <Text fontWeight='700'>2</Text>
          </Box>
        </Box>

        <Box display='flex' mt={10} justifyContent='space-evenly' width='full'>
          {collectionData.nfts.map((data, i) => (
            <NftCard
              key={i}
              name={data.name}
              author={data.author}
              owner={data.owner}
              status={data.status}
              price={data.price}
              image={data.image}
            />
          ))}
        </Box>
      </Box>
    </Layout>
  )
}
