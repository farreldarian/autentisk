import { Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends BoxProps {
  children: ReactNode
}

export default function SaleBox(props: Props) {
  const { children, ...rest } = props
  return (
    <Box border='1px' rounded='3xl' p='6' borderColor='gray.300' {...rest}>
      {children}
    </Box>
  )
}
