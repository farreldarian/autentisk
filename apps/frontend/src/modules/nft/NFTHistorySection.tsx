import { Box } from '@chakra-ui/react'
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
          display={'flex'}
          width='full'
          justifyContent={'space-between'}
          padding={'6px'}
          key={i}
        >
          <Box>{ask.createdAt}</Box>

          <Box>{ask.price}</Box>

          {ask.buyer && <Box>Buyer : {ask.buyer}</Box>}

          {ask.seller && <Box>Seller: {ask.seller}</Box>}

          {ask.soldAt && <Box>Sold at: {ask.soldAt}</Box>}
        </Box>
      ))}
    </>
  )
}
