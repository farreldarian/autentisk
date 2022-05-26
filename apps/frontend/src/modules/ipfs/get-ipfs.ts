import { create } from "ipfs-http-client";

// const IPFS_HOST = "api.thegraph.com/ipfs";
const IPFS_HOST = "ipfs.infura.io";

export default function getIpfs() {
  return create({
    host: IPFS_HOST,
    protocol: "https",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
