import { Flex, Tag, Text } from '@chakra-ui/react'

export type SimilarityStatus = 'Pending' | 'Rejected' | 'Registered'

interface Props {
  status: SimilarityStatus
}

export default function SimilarityText({ distance, status }: Props) {
  return (
    <Flex gap='3'>

    </Flex>
  )
}
