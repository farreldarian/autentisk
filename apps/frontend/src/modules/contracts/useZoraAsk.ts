import { constants } from 'ethers'
import { useEffect, useState } from 'react'
import { useContractWrite, useNetwork } from 'wagmi'
import { AsksV1_1__factory } from '../../../generated/typechain'

export const ZORA_ASK_ADDRESSES = {
  [1]: '0x6170B3C3A54C3d8c854934cBC314eD479b2B29A3',
  [137]: '0x3634e984Ba0373Cfa178986FD19F03ba4dD8E469',
  [3]: '0x3e80102228295fFD120990d54e954C473EDE7280',
  [4]: '0xA98D3729265C88c5b3f861a0c501622750fF4806',
  [80001]: '0xCe6cEf2A9028e1C3B21647ae3B4251038109f42a',
}

export function useZoraAsk(functionName: string, args: any) {
  const { activeChain } = useNetwork()

  const [address, setAddress] = useState<string>(constants.AddressZero)
  useEffect(() => {
    if (!activeChain?.id) return

    setAddress(ZORA_ASK_ADDRESSES[activeChain.id])
  }, [activeChain?.id])

  return useContractWrite(
    {
      addressOrName: address,
      contractInterface: AsksV1_1__factory.abi,
    },
    functionName,
    { args }
  )
}
