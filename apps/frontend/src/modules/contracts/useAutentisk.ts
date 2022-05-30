import type { WriteContractArgs } from ".pnpm/@wagmi+core@0.2.5_sfaouzus3kgevh6ojdhdkc66vi/node_modules/@wagmi/core";
import { Autentisk__factory } from "../../../generated/typechain";
import { chain, useContractWrite, useNetwork } from "wagmi";
import { constants } from "ethers";

const ADDRESSES = {
  [chain.polygonMumbai.id]: {
    Autentisk: "0x9D120BfC080F788Bc16db59333dDA022a70489e9",
  },
};

function getAddress(chainId?: number) {
  if (!chainId) return constants.AddressZero;
  return ADDRESSES[chainId].Autentisk;
}

export function useAutentisk(functionName: string, args: any) {
  const { activeChain } = useNetwork();

  return useContractWrite(
    {
      addressOrName: getAddress(activeChain?.id),
      contractInterface: Autentisk__factory.abi,
    },
    functionName,
    { args }
  );
}
