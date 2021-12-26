import { Center, Heading } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Authentic NFT Marketplace</title>
        <meta name="description" content="AI-Driven NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Center>
          <Heading>Authentic NFT Marketplace</Heading>
        </Center>
      </main>
    </div>
  );
}
