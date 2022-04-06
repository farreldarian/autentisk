import { Box, ChakraProvider, extendTheme} from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Authentic NFT Marketplace</title>
        <meta name="description" content="AI-Driven NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box>
          <Navbar/>
        </Box>
      </main>
    </div>
  );
}
