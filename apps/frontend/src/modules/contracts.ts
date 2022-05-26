import type { WriteContractArgs } from ".pnpm/@wagmi+core@0.2.5_sfaouzus3kgevh6ojdhdkc66vi/node_modules/@wagmi/core";
import { Autentisk__factory } from "../../generated/typechain";
import { chain, useContractWrite, useNetwork } from "wagmi";

const ADDRESSES = {
  [chain.polygonMumbai.id]: {
    Autentisk: "0x63e5ADAB12697794e5d45392b73B12fd231856BA",
  },
};

export function useAutentisk(functionName: string, args: any) {
  const { activeChain } = useNetwork();

  if (!activeChain?.id) throw new Error("Should specify chain ID");

  return useContractWrite(
    {
      addressOrName: ADDRESSES[activeChain.id].Autentisk,
      contractInterface: Autentisk__factory.abi,
    },
    functionName,
    { args }
  );
}
