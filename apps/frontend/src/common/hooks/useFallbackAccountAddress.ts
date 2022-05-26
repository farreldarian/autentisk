import { constants } from "ethers";
import { useAccount } from "wagmi";

export default function useFallbackAccountAddress() {
  const { data } = useAccount();
  if (data?.address) return { address: data.address, fallback: false };
  else return { address: constants.AddressZero, fallback: true };
}
