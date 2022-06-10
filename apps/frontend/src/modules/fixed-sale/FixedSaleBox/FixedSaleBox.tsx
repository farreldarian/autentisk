import { BoxProps, Heading } from '@chakra-ui/react'
import { useActiveAskQuery } from '../../../../generated/graphql'
import SaleBox from '../../../common/components/SaleBox'
import useAccountAddress from '../../contracts/useAccountAddress'
import { useERC721Read } from '../../contracts/useERC721Read'
import OnSaleState from './OnSaleState'
import SellState from './SellState'

interface Props extends BoxProps {
  tokenId: string
  collectionAddress: string
}

export default function FixedSaleBox(props: Props) {
  const { collectionAddress, tokenId, ...rest } = props

  const accountAddress = useAccountAddress()

  const { data: tokenOwner } = useERC721Read(collectionAddress, 'ownerOf', [
    tokenId,
  ])
  const isOwner = tokenOwner && tokenOwner.toString() === accountAddress

  const [{ data: askData }, refetchQuery] = useActiveAskQuery({
    variables: { tokenId: `${collectionAddress}-${tokenId}` },
  })
  const hasSale = askData && askData.asks.length > 0

  return (
    <SaleBox {...rest}>
      {askData?.asks.map((ask, i) => (
        <OnSaleState
          tokenId={tokenId}
          collectionAddress={collectionAddress}
          refetchQuery={refetchQuery}
          {...ask}
          key={i}
        />
      ))}

      {!hasSale &&
        (isOwner ? (
          <SellState
            collectionAddress={collectionAddress}
            tokenId={tokenId}
            refetchQuery={refetchQuery}
          />
        ) : (
          <Heading>No Listing</Heading>
        ))}
    </SaleBox>
  )
}
