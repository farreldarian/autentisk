import { constants } from 'ethers'
import { useEffect, useState } from 'react'
import { useContractWrite, useNetwork } from 'wagmi'
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
} from 'wagmi/dist/declarations/src/hooks/contracts/useContractWrite'
import { AsksV1_1__factory } from '../../../generated/typechain'
import { ZORA_ASK_ADDRESSES } from './addresses'

export function useZoraAsk(
  functionName: string,
  args: any,
  overrides?: Omit<UseContractWriteArgs & UseContractWriteConfig, 'args'>
) {
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
    { args, ...overrides }
  )
}
