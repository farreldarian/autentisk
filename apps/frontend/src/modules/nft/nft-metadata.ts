import useSWR from "swr";
import { parseIfIpfs } from "../../common/utils/ipfs";

export function useNftMetadata(uri?: string) {
  return useSWR<{ name: string; description: string; image: string }>(
    uri && parseIfIpfs(uri)
  );
}
