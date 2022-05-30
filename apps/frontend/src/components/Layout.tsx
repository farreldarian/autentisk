import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
  children?: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <Box bg='gray.50' minH='100vh'>
      <Navbar />
      {children}
    </Box>
  )
}
