import { readdirSync, readFileSync, writeFileSync } from 'fs'
import type { Deployment } from 'hardhat-deploy/types'
import { resolve } from 'path'

const BASE_PATH = resolve(__dirname, '../deployments')
const OUTPUT_PATH = resolve(
  __dirname,
  '../../../packages/contract/src/constants/deployed-contracts.ts'
)
const PYTHON_OUTPUT = resolve(
  __dirname,
  '../../authenticity-api/core/constants/deployed_contracts.py'
)

function getChainId(network: string) {
  return Number(readFileSync(`${BASE_PATH}/${network}/.chainId`, 'utf-8'))
}

function getArtifacts(network: string) {
  return readdirSync(`${BASE_PATH}/${network}`)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace('.json', ''))
}

function getDeployment(network: string, artifact: string): Deployment {
  return JSON.parse(
    readFileSync(`${BASE_PATH}/${network}/${artifact}.json`, 'utf-8')
  )
}

async function main() {
  let template = `export default {\n`
  let pythonTemplate = `DEPLOYED_CONTRACTS = {\n`

  const networks = readdirSync(BASE_PATH)
  for (const [i, network] of networks.entries()) {
    const chainId = getChainId(network)
    const artifacts = getArtifacts(network)

    template += `  [${chainId}]: {\n`
    pythonTemplate += `    ${chainId}: {\n`
    for (const [j, artifact] of artifacts.entries()) {
      const deployment = getDeployment(network, artifact)
      template += `    '${artifact}': {\n`
      pythonTemplate += `        "${artifact}": {\n`

      template += `      address: "${deployment.address}",\n`
      pythonTemplate += `            "address": "${deployment.address}",\n`
      pythonTemplate += `            "abi": '${JSON.stringify(
        deployment.abi
      )}',\n`

      if (deployment.receipt) {
        template += `      startBlock: ${deployment.receipt.blockNumber},\n`
      }

      if (j + 1 === artifact.length) {
        template += `    }\n`
        pythonTemplate += `        }\n`
      } else {
        template += `    },\n`
        pythonTemplate += `        },\n`
      }
    }

    if (i + 1 === networks.length) {
      template += `  }\n`
      pythonTemplate += `    }\n`
    } else {
      template += `  },\n`
      pythonTemplate += `    },\n`
    }
  }
  template += `}`
  pythonTemplate += `}`
  writeFileSync(OUTPUT_PATH, template)
  writeFileSync(PYTHON_OUTPUT, pythonTemplate)
}

main()
