import { Box } from '@chakra-ui/react'
import { shortenIfAddress } from '@usedapp/core'
import { format } from 'date-fns'
import { useGetAskHistoriesQuery } from '../../../generated/graphql'

interface Props {
  tokenId: string
}
export default function NFTHistorySection(props: Props) {
  const { tokenId } = props

  const [{ data }] = useGetAskHistoriesQuery({
    variables: { tokenId: tokenId },
  })
  return (
    <>
      {data?.askHistories.map((ask, i) => (
        <Box
          marginY={'6px'}
          flexDirection={'column'}
          display={'flex'}
          width='full'
          gap={'6px'}
          padding={'24px'}
          borderRadius='2xl'
          key={i}
          border={'1px'}
          borderColor={'blackAlpha.400'}
        >
          <Box display={'flex'} justifyContent='space-between'>
            <Box>
              Minted at: {format(parseInt(ask.soldAt) * 1000, 'yyyy/MM/dd')}
              <br />
              Sold at: {format(parseInt(ask.soldAt) * 1000, 'yyyy/MM/dd')}
            </Box>

            <Box>
              Buyer : {ask.buyer?.id ? shortenIfAddress(ask.buyer.id) : <>-</>}
              <br />
              Seller: {shortenIfAddress(ask.seller.id)}
            </Box>
          </Box>

          <Box textAlign={'right'} fontWeight={'bold'}>
            Price: {ask.price} MATIC
          </Box>
        </Box>
      ))}
    </>
  )
}
