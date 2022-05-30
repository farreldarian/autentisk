import fs from 'fs'
import { providers } from 'ethers'
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

async function getDeployment(chainId: number, contract: string) {
  const network = providers.getNetwork(chainId)
  return (
    await import(
      `../apps/protocol/deployments/${network.name}/${contract}.json`
    )
  ).default
}

function getTemplate() {
  return fs.readFileSync('../apps/subgraph/subgraph.template.yaml', 'utf-8')
}

function writeManifest(manifest: string) {
  fs.writeFileSync('../apps/subgraph/subgraph.yaml', manifest)
}

async function main() {
  const chainId = Number(getArgs('chainId'))

  const deployment = await getDeployment(chainId, 'Autentisk')
  const template = getTemplate()

  const manifest = Mustache.render(template, {
    network: getSubgraphNetworkName(chainId),
    address: deployment.address,
    startBlock: deployment.receipt.blockNumber,
  })
  writeManifest(manifest)
}

main()
