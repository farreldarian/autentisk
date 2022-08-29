import { constants } from 'ethers'
import { useEffect, useState } from 'react'
import { useDeprecatedContractWrite, useNetwork } from 'wagmi'
import {
  UseDeprecatedContractWriteArgs,
  UseDeprecatedContractWriteConfig,
} from 'wagmi/dist/declarations/src/hooks/contracts/useDeprecatedContractWrite'
import { AsksV1_1__factory } from '../../../generated/typechain'
import { ZORA_ASK_ADDRESSES } from './addresses'

export function useZoraAsk(
  functionName: string,
  args: any,
  overrides?: Partial<
    UseDeprecatedContractWriteArgs & UseDeprecatedContractWriteConfig
  >
) {
  const { chain } = useNetwork()

  const [address, setAddress] = useState<string>(constants.AddressZero)
  useEffect(() => {
    if (!chain?.id) return

    setAddress(ZORA_ASK_ADDRESSES[chain.id])
  }, [chain?.id])

  return useDeprecatedContractWrite({
    addressOrName: address,
    contractInterface: AsksV1_1__factory.abi,
    functionName,
    args,
    ...overrides,
  })
}
