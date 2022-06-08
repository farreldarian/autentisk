import { getDeployment } from 'contract'
import fs from 'fs'
import Mustache from 'mustache'
import { getRequiredArgs } from './helpers/get-required-args'

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
  const chainId = Number(getRequiredArgs('chainId'))

  const networks = JSON.parse(
    fs.readFileSync('../apps/subgraph/networks.json', 'utf-8')
  )
  const autentiskDeployment = getDeployment(chainId, 'Autentisk')

  const networkName = getSubgraphNetworkName(chainId)
  const manifest = Mustache.render(getTemplate(), {
    network: networkName,
    AsksV1_1__address: networks[networkName]['AsksV1_1']['address'],
    AsksV1_1__startBlock: networks[networkName]['AsksV1_1']['startBlock'],
    Autentisk__address: autentiskDeployment.address,
    Autentisk__startBlock: autentiskDeployment.startBlock,
  })
  writeManifest(manifest)
}

main()
