import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <Box>{children}</Box>
    </div>
  );
}
