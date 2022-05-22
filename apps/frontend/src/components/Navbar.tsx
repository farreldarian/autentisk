import { Search2Icon, BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  DefaultIcon,
  Flex,
  Heading,
  HStack,
  IconButton,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { formatEther } from "ethers/lib/utils";
import { isNil } from "lodash";
import { useMemo, useState } from "react";
import AccountModal from "./connect-wallet/AccountModal";
import Link from "next/link";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { utils } from "ethers";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const { data: account } = useAccount();

  const connected = useMemo(() => !isNil(account?.address), [account?.address]);

  return (
    <Flex
      align="center"
      justify={"space-between"}
      bg="#EDF2F760"
      position="sticky"
      top={0}
      height="20"
      px="24"
      backdropFilter="blur(16px)"
    >
      <Heading letterSpacing={1} fontSize="32px" mr="6">
        {" "}
        <Link href="/">Autentisk</Link>{" "}
      </Heading>

      <Flex align="center">
        {connected && (
          <Link href="/mintNFT" passHref>
            <Button mr="6">Create</Button>
          </Link>
        )}

        <ConnectButton showBalance={false} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
