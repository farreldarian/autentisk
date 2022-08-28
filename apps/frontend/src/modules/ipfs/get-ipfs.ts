import { create } from 'ipfs-http-client'

// const IPFS_HOST = "api.thegraph.com/ipfs";
const IPFS_HOST = 'ipfs.infura.io'

const projectId = '2DyvrPekCFg9j8vHXZHQcQWbDCq'
const projectSecret = 'd0ad0f4a5e387c071df6a33c443acb0e'

const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

export default function getIpfs() {
  return create({
    host: IPFS_HOST,
    protocol: 'https',
    port: 5001,
    apiPath: '/api/v0',
    headers: {
      authorization: auth,
    },
  })
}
