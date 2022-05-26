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
      bg="#F7FAFC60"
      position="sticky"
      top={0}
      height="20"
      px="24"
      borderBottom="1px"
      borderColor={"whiteAlpha.500"}
      backdropFilter="blur(16px)"
      zIndex={10}
    >
      <Heading letterSpacing={1} size="lg" mr="6">
        <Link href="/">Autentisk</Link>
      </Heading>

      <HStack spacing={"6"}>
        {connected && (
          <Link href="/mint" passHref>
            <Button>Create</Button>
          </Link>
        )}

        <ConnectButton showBalance={false} />
      </HStack>
    </Flex>
  );
};

export default Navbar;
