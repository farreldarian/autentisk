import { Box } from '@chakra-ui/react'
import Image from 'next/image'

interface Props {
  src: string
  alt: string
}

export default function ActivityRowImage(props: Props) {
  const { src, alt } = props
  return (
    <Box rounded={'lg'} overflow={'hidden'} h='16' w='16' position={'relative'}>
      <Image layout='fill' alt={alt} src={src} />
    </Box>
  )
}
