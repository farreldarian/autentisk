import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <Box bg="gray.100" minH="100vh">
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
}
