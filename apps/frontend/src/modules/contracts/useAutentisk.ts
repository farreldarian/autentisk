import { getDeployment } from 'contract'
import { constants } from 'ethers'
import { useEffect, useState } from 'react'
import { useDeprecatedContractWrite, useNetwork } from 'wagmi'
import { Autentisk__factory } from '../../../generated/typechain'

export async function getAutentiskAddress(chainId?: number) {
  if (!chainId) return constants.AddressZero
  // return (await import('protocol/deployments/maticmum/Autentisk.json')).default
  //   .address
  return (await getDeployment(chainId, 'Autentisk')).address
}

export function useAutentisk(functionName: string, args: any) {
  const { chain } = useNetwork()

  const [address, setAddress] = useState<string>(constants.AddressZero)
  useEffect(() => {
    getAutentiskAddress(chain?.id ?? 80001).then(setAddress)
  }, [chain?.id])

  return useDeprecatedContractWrite({
    addressOrName: address,
    contractInterface: Autentisk__factory.abi,
    functionName,
    args,
  })
}
