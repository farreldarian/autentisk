import {
  Link,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { shortenIfAddress } from '@usedapp/core'
import { useMintActivityQuery } from '../../../generated/graphql'
import { parseIfIpfs } from '../../common/utils/ipfs'
import MintLayout from '../../layouts/mint/MintLayout'

export default function History() {
  const [{ data }] = useMintActivityQuery()

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
                <Td>{shortenIfAddress(item.collection.owner.id)}</Td>
                <Td>{item.collection.name}</Td>
                <Td display={'flex'} gap='2'>
                  {item.similarity && (
                    <Text color={item.status === 'Rejected' ? 'red' : 'green'}>
                      {item.similarity}
                    </Text>
                  )}

                  <Tag
                    colorScheme={
                      item.status === 'Pending'
                        ? 'orange'
                        : item.status === 'Rejected'
                        ? 'red'
                        : 'green'
                    }
                  >
                    {item.status}
                  </Tag>
                </Td>
                <Td>
                  <Link
                    href={parseIfIpfs(item.tokenUri)}
                    target='_blank'
                    rel='noreferrer'
                    variant='ghost'
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
