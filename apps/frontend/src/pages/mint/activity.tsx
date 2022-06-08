import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { useMintActivityQuery } from '../../../generated/graphql'
import MintLayout from '../../layouts/mint/MintLayout'
import ActivityRow from '../../modules/mint/ActivityRow'

export default function History() {
  const [{ data: gqlData }] = useMintActivityQuery()

  return (
    <MintLayout>
      <TableContainer>
        <Table mt='12'>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Minter</Th>
              <Th>Collection</Th>
              <Th>Status</Th>
              <Th>Most Similar</Th>
              <Th></Th>
            </Tr>
          </Thead>

          <Tbody>
            {gqlData?.authenticityRequests.map((item, i) => (
              <ActivityRow key={i} {...item} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MintLayout>
  )
}
