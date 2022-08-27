import { Box, Button, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { parseIfIpfs } from '../../common/utils/ipfs'
import { useNftMetadata } from '../nft/nft-metadata'

type Props = {
  tokenUri: string
  collectionId: string
  tokenId: string
}

export default function HomeNftCard({
  tokenUri,
  collectionId,
  tokenId,
}: Props) {
  const { data: metadata } = useNftMetadata(tokenUri)

  return (
    <Box
      minH={'500px'}
      margin='1'
      padding={6}
      flexBasis={'30%'}
      background={'blackAlpha.400'}
      borderRadius={'3xl'}
      {...(metadata && { backgroundImage: parseIfIpfs(metadata.image) })}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
      backgroundBlendMode='overlay'
      backgroundPosition={'center'}
      display={'flex'}
      flexDir={'column'}
      justifyContent={'flex-end'}
      color={'white'}
    >
      {metadata && (
        <Text fontSize={'3xl'} textShadow={'2px 2px black'}>
          {metadata.name}
        </Text>
      )}

      {/* <Text fontSize={'2xl'}>{data.price} ETH</Text> */}

      <Link href={`/collection/${collectionId}/${tokenId}`} passHref>
        <Button colorScheme={'blackAlpha'}>View NFT</Button>
      </Link>
    </Box>
  )
}
