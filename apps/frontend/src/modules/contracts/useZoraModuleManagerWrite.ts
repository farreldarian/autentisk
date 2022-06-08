import { constants } from 'ethers'
import { useEffect, useState } from 'react'
import { useContractWrite, useNetwork } from 'wagmi'
import { ZoraModuleManager__factory } from '../../../generated/typechain'
import { ZORA_MODULE_MANAGER } from './addresses'

export function useZoraModuleManagerWrite(functionName: string, args: any) {
  const { activeChain } = useNetwork()

  const [address, setAddress] = useState<string>(constants.AddressZero)
  useEffect(() => {
    if (!activeChain?.id) return

    setAddress(ZORA_MODULE_MANAGER[activeChain.id])
  }, [activeChain?.id])

  return useContractWrite(
    {
      addressOrName: address,
      contractInterface: ZoraModuleManager__factory.abi,
    },
    functionName,
    { args }
  )
}
