import { QuestionIcon } from '.pnpm/@chakra-ui+icons@1.1.7_5qblqjf622vzzkdskgddihcrca/node_modules/@chakra-ui/icons'
import {
  Flex,
  Link,
  Skeleton,
  Tag,
  Td,
  Text,
  Tooltip,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { shortenIfAddress } from '@usedapp/core'
import { useMemo } from 'react'
import useSWR from 'swr'
import { ActivityRowFragment } from '../../../generated/graphql'
import { parseIfIpfs } from '../../common/utils/ipfs'
import getAddressExplorerUrl from '../../common/utils/misc/get-address-explorer-url'
import { useNftMetadata } from '../nft/nft-metadata'
import ActivityRowImage from './ComparisonImage'

interface Props extends ActivityRowFragment {}

export default function ActivityRow(props: Props) {
  const {
    collection,
    status,
    tokenUri,
    tokenUriSignature,
    similarity: distance,
  } = props

  const { data: metadata } = useNftMetadata(tokenUri)
  const { data } = useSWR(
    status === 'Rejected' &&
      `/api/closestSimilarity?uriSig=${tokenUriSignature}`
  )

  const similarity = useMemo(() => {
    if (!distance) return undefined
    if (distance > 1) return 0
    return (100 - distance * 100).toFixed(2)
  }, [distance])

  return (
    <Tr>
      <Td>
        <Skeleton isLoaded={!!metadata}>
          {metadata && (
            <ActivityRowImage
              src={parseIfIpfs(metadata.image)}
              alt='incoming-image'
            />
          )}
        </Skeleton>
      </Td>
      <Td>
        <Link
          href={getAddressExplorerUrl(collection.owner.id)}
          target='_blank'
          rel='noreferrer'
        >
          {shortenIfAddress(collection.owner.id)}
        </Link>
      </Td>
      <Td>{collection.name}</Td>
      <Td>
        <Tag
          colorScheme={
            status === 'Pending'
              ? 'orange'
              : status === 'Rejected'
              ? 'red'
              : 'green'
          }
        >
          {status}
        </Tag>
      </Td>
      <Td>
        <Skeleton isLoaded={!!data}>
          {data && (
            <Flex gap='3'>
              <ActivityRowImage
                src={data.original.imageUrl}
                alt='orginal-image'
              />

              <VStack justify='center' align={'flex-start'}>
                {similarity && (
                  <Flex gap='1'>
                    <Text
                      color={status === 'Rejected' ? 'red' : 'green'}
                      fontSize='sm'
                    >
                      {similarity}%
                    </Text>

                    <Tooltip label='Cosine Similarity' fontSize='md'>
                      <Text color='gray.300' cursor='pointer'>
                        <QuestionIcon />
                      </Text>
                    </Tooltip>
                  </Flex>
                )}

                {distance && (
                  <Flex gap='2'>
                    <Text
                      color={status === 'Rejected' ? 'red' : 'green'}
                      fontSize='sm'
                    >
                      {Number(distance).toFixed(2)}
                    </Text>

                    <Tooltip label='Cosine Distance' fontSize='md'>
                      <Text color='gray.300' cursor='pointer'>
                        <QuestionIcon />
                      </Text>
                    </Tooltip>
                  </Flex>
                )}
              </VStack>
            </Flex>
          )}
        </Skeleton>
        {!data && distance && (
          <Text color={status === 'Rejected' ? 'red' : 'green'} fontSize='sm'>
            {Number(distance).toFixed(2)}
          </Text>
        )}
      </Td>
      <Td>
        <Link href={parseIfIpfs(tokenUri)} target='_blank' rel='noreferrer'>
          uri
        </Link>
      </Td>
    </Tr>
  )
}
