import {
  Box,
  Center,
  Heading,
  Image,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { parseIfIpfs } from '../common/utils/ipfs'
import { useNftMetadata } from '../modules/nft/nft-metadata'

interface NftCardProps {
  collectionAddress: string
  tokenId: string
  uri: string
  owner: string
}

export default function NftCard({
  uri,
  owner,
  collectionAddress,
  tokenId,
}: NftCardProps) {
  const { data: metadata } = useNftMetadata(uri)

  return (
    <Link href={`/collection/${collectionAddress}/${tokenId}`} passHref>
      <Center py={12}>
        <Box
          cursor='pointer'
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              ...(metadata && {
                backgroundImage: `url(${parseIfIpfs(metadata!.image)})`,
              }),
              filter: 'blur(16px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(32px)',
              },
            }}
          >
            {metadata && (
              <Image
                alt='nft'
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src={parseIfIpfs(metadata.image)}
              />
            )}
          </Box>
          <Stack pt={10} align={'left'}>
            {/* <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {author}
          </Text> */}
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {metadata?.name}
            </Heading>
            {/* <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              {price} ETH
            </Text>
          </Stack> */}
          </Stack>
        </Box>
      </Center>
    </Link>
  )
}
