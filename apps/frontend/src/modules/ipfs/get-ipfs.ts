import { create } from 'ipfs-http-client'

// const IPFS_HOST = "api.thegraph.com/ipfs";
const IPFS_HOST = 'ipfs.infura.io'

export default function getIpfs() {
  return create({
    host: IPFS_HOST,
    protocol: 'https',
    port: 5001,
    apiPath: '/api/v0',
  })
}
