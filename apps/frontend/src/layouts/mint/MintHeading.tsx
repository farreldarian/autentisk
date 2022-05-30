import { Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  href: string
  isActive: boolean
  children: ReactNode
}

export default function MintHeading({ href, isActive, children }: Props) {
  return (
    <Link href={href} passHref>
      <Heading
        as='a'
        size='lg'
        color={isActive ? 'black' : 'gray.300'}
        _hover={{ color: 'black', transition: '75ms ease-in-out' }}
      >
        {children}
      </Heading>
    </Link>
  )
}
