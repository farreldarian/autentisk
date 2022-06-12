import { Button, ButtonProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useNetwork, useWaitForTransaction } from 'wagmi'

interface Props extends ButtonProps {
  children: ReactNode
  status: 'error' | 'loading' | 'success' | 'idle'
  txHash?: string
}

export default function TxButton(props: Props) {
  const {
    children,
    status,
    txHash,
    onClick,
    isLoading: parentIsLoading,
    ...rest
  } = props

  const { activeChain } = useNetwork()
  const { isLoading } = useWaitForTransaction({ hash: txHash })
  const isMining = status === 'success' && isLoading

  function redirectToTxPage() {
    const url = activeChain?.blockExplorers?.etherscan.url
    if (!url || !txHash) return
    window.open(`${url}/tx/${txHash}`)
  }

  return (
    <Button
      {...rest}
      isLoading={parentIsLoading || status === 'loading'}
      onClick={(e) => (isMining ? redirectToTxPage() : onClick && onClick(e))}
    >
      {isMining ? <>Mining...</> : <>{children}</>}
    </Button>
  )
}
