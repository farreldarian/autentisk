import { Box, Heading, Text } from '@chakra-ui/react'
import { constants } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import TxButton from '../../../common/components/TxButton'
import useToast from '../../../common/hooks/useToast'
import { useZoraAsk } from '../../contracts/useZoraAsk'

interface Props {
  collectionAddress: string
  tokenId: string
  currency: {
    symbol: string
    decimal: number
  }
  price: string
  refetchQuery: () => void
}

export default function OnSaleState(props: Props) {
  const { price, collectionAddress, tokenId, currency, refetchQuery } = props

  const { data: account } = useAccount()

  const toast = useToast()
  const [tx, setTx] = useState<string | undefined>()
  const { writeAsync, status } = useZoraAsk(
    'fillAsk',
    [
      collectionAddress,
      tokenId,
      currency.id,
      parseUnits(price, currency.decimal),
      constants.AddressZero,
    ],
    { overrides: { value: parseUnits(price, currency.decimal) } }
  )

  async function buy() {
    try {
      const tx = await writeAsync()
      setTx(tx.hash)
      tx.wait(3).then(refetchQuery)
      toast({ status: 'success', title: `Submitted transaction` })
    } catch (e) {
      if (e.error?.data?.message) {
        toast({ status: 'error', title: e.error.data.message })
      }
    }
  }

  return (
    <Box>
      <Text>Price</Text>
      <Heading>
        {price} {currency.symbol}
      </Heading>

      {account && (
        <TxButton
          txHash={tx}
          status={status}
          mt='3'
          w='full'
          size='lg'
          onClick={buy}
        >
          Buy
        </TxButton>
      )}
    </Box>
  )
}
