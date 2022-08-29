import { constants } from 'ethers'
import { useEffect, useState } from 'react'
import { useContractRead, useNetwork } from 'wagmi'
import { ZoraModuleManager__factory } from '../../../generated/typechain'
import { ZORA_MODULE_MANAGER } from './addresses'

export function useZoraModuleManagerRead(functionName: string, args: any) {
  const { chain } = useNetwork()

  const [address, setAddress] = useState<string>(constants.AddressZero)
  useEffect(() => {
    if (!chain?.id) return

    setAddress(ZORA_MODULE_MANAGER[chain.id])
  }, [chain?.id])

  return useContractRead({
    addressOrName: address,
    contractInterface: ZoraModuleManager__factory.abi,
    functionName,
    args,
  })
}
