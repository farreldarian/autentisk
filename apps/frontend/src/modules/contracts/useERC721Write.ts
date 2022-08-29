import { useDeprecatedContractWrite } from 'wagmi'
import { ERC721__factory } from '../../../generated/typechain'

export function useERC721Write(
  address: string,
  functionName: string,
  args: any
) {
  return useDeprecatedContractWrite({
    addressOrName: address,
    contractInterface: ERC721__factory.abi,
    functionName,
    args,
  })
}
