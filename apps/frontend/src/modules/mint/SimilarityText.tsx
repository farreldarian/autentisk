import { Tag, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

export type SimilarityStatus = 'Pending' | 'Rejected' | 'Registered'

interface Props {
  distance?: number
  status: SimilarityStatus
}

export default function SimilarityText({ distance, status }: Props) {
  const similarity = useMemo(() => {
    if (!distance) return undefined
    if (distance > 1) return 0
    return (100 - distance * 100).toFixed(2)
  }, [distance])

  return (
    <>
      <Text color={status === 'Rejected' ? 'red' : 'green'}>{similarity}%</Text>

      <Tag
        colorScheme={
          status === 'Pending'
            ? 'orange'
            : status === 'Rejected'
            ? 'red'
            : 'green'
        }
      >
        {status}
      </Tag>
    </>
  )
}
