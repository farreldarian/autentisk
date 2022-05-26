import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useContractWrite, useNetwork } from "wagmi";
import { Autentisk__factory } from "../../../generated/typechain";
import CreateCollectionForm from "../../components/CreateCollectionForm";
import Layout from "../../components/Layout";
import { useAutentisk } from "../../modules/contracts";

export default function Create() {
  const { activeChain } = useNetwork();

  return (
    <Layout>
      <Flex
        maxWidth="container.md"
        minH="calc(100vh - 80px)"
        minW="100vw"
        align="center"
        justify={"center"}
      >
        {activeChain?.id && !activeChain?.unsupported && (
          <CreateCollectionForm />
        )}
      </Flex>
    </Layout>
  );
}
