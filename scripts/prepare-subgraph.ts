import { getDeployment } from 'contract'
import fs from 'fs'
import Mustache from 'mustache'

function getArgs(name: string): string {
  const args = process.argv
  const infoIdx = args.indexOf('--' + name)
  if (infoIdx === -1) throw new Error('Must specify --' + name)
  return args[infoIdx + 1]
}

function getSubgraphNetworkName(chainId: number): string {
  switch (chainId) {
    case 80001:
      return 'mumbai'
    default:
      throw new Error('Unhandled')
  }
}

function getTemplate() {
  return fs.readFileSync('../apps/subgraph/subgraph.template.yaml', 'utf-8')
}

function writeManifest(manifest: string) {
  fs.writeFileSync('../apps/subgraph/subgraph.yaml', manifest)
}

function main() {
  const chainId = Number(getArgs('chainId'))

  const deployment = getDeployment(chainId, 'Autentisk')

  const manifest = Mustache.render(getTemplate(), {
    network: getSubgraphNetworkName(chainId),
    address: deployment.address,
    startBlock: deployment.startBlock,
  })
  writeManifest(manifest)
}

main()
