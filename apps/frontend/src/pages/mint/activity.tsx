import {
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { shortenIfAddress } from '@usedapp/core'
import { useNetwork } from 'wagmi'
import { useMintActivityQuery } from '../../../generated/graphql'
import { parseIfIpfs } from '../../common/utils/ipfs'
import getAddressExplorerUrl from '../../common/utils/misc/get-address-explorer-url'
import MintLayout from '../../layouts/mint/MintLayout'
import SimilarityText from '../../modules/mint/SimilarityText'

export default function History() {
  const [{ data }] = useMintActivityQuery()
  const { activeChain } = useNetwork()

  return (
    <MintLayout>
      <TableContainer>
        <Table mt='12'>
          <Thead>
            <Tr>
              <Th>Minter</Th>
              <Th>Collection</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>

          <Tbody>
            {data?.authenticityRequests.map((item, i) => (
              <Tr key={i}>
                <Td>
                  <Link
                    href={getAddressExplorerUrl(item.collection.owner.id)}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {shortenIfAddress(item.collection.owner.id)}
                  </Link>
                </Td>
                <Td>{item.collection.name}</Td>
                <Td display={'flex'} gap='2'>
                  <SimilarityText
                    status={item.status}
                    distance={item.similarity}
                  />
                </Td>
                <Td>
                  <Link
                    href={parseIfIpfs(item.tokenUri)}
                    target='_blank'
                    rel='noreferrer'
                  >
                    uri
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MintLayout>
  )
}
