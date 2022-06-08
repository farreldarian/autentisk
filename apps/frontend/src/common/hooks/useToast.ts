import { useToast as useChakraToast } from '@chakra-ui/react'

export default function useToast() {
  return useChakraToast({
    isClosable: true,
    position: 'bottom-right',
    variant: 'solid',
  })
}
