import { useContractRead } from 'wagmi'
import { ERC721__factory } from '../../../generated/typechain'

export function useERC721Read(
  address: string,
  functionName: string,
  args: any
) {
  return useContractRead(
    {
      addressOrName: address,
      contractInterface: ERC721__factory.abi,
    },
    functionName,
    { args }
  )
}
