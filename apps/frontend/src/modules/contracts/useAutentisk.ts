import { Autentisk__factory } from '../../../generated/typechain'
import { useContractWrite, useNetwork } from 'wagmi'
import { constants } from 'ethers'
import { getDeployment } from 'contract'
import { useEffect, useState } from 'react'

async function getAddress(chainId?: number) {
  if (!chainId) return constants.AddressZero
  // return (await import('protocol/deployments/maticmum/Autentisk.json')).default
  //   .address
  return (await getDeployment(chainId, 'Autentisk')).address
}

export function useAutentisk(functionName: string, args: any) {
  const { activeChain } = useNetwork()

  const [address, setAddress] = useState<string>(constants.AddressZero)
  useEffect(() => {
    getAddress(activeChain?.id ?? 80001).then(setAddress)
  }, [activeChain?.id])

  return useContractWrite(
    {
      addressOrName: address,
      contractInterface: Autentisk__factory.abi,
    },
    functionName,
    { args }
  )
}
