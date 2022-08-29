import { Flex, Link, Skeleton, Tag, Td, Text, Tr } from '@chakra-ui/react'
import { shortenIfAddress } from '@usedapp/core'
import useSWR from 'swr'
import { ActivityRowFragment } from '../../../generated/graphql'
import { parseIfIpfs } from '../../common/utils/ipfs'
import getAddressExplorerUrl from '../../common/utils/misc/get-address-explorer-url'
import { useNftMetadata } from '../nft/nft-metadata'
import ActivityRowImage from './ComparisonImage'

interface Props extends ActivityRowFragment {}

export default function ActivityRow(props: Props) {
  const { collection, status, tokenUri, tokenUriSignature, similarity } = props

  const { data: metadata } = useNftMetadata(tokenUri)
  const { data } = useSWR(
    status === 'Rejected' &&
      `/api/closestSimilarity?uriSig=${tokenUriSignature}`
  )

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
          {data ? (
            <Flex gap='3' alignItems={'center'}>
              {!data.error && (
                <ActivityRowImage
                  src={data.original.imageUrl}
                  alt='orginal-image'
                />
              )}

              {similarity && (
                <Text
                  color={status === 'Rejected' ? 'red' : 'green'}
                  fontSize='sm'
                >
                  {(similarity * 100).toFixed(2)}%
                </Text>
              )}
            </Flex>
          ) : (
            <></>
          )}
        </Skeleton>

        {!data && similarity && (
          <Text color={status === 'Rejected' ? 'red' : 'green'} fontSize='sm'>
            {(similarity * 100).toFixed(2)}%
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
