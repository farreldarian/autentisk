import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useAutentisk } from "../modules/contracts";

export default function CreateCollectionForm() {
  const { writeAsync, isLoading, isSuccess, error } = useAutentisk(
    "createCollection",
    ["", ""]
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = e.target["name"].value;
    const symbol = e.target["symbol"].value;

    await writeAsync({ args: [name, symbol] });
  }

  return (
    <Box>
      <Heading as="h2" size="lg" isTruncated>
        Create New Collection
      </Heading>

      <form onSubmit={onSubmit}>
        <FormControl marginTop={12}>
          <FormLabel>
            <strong>Collection Name</strong>
          </FormLabel>

          <Input id="name" />
        </FormControl>

        <FormControl marginTop={3}>
          <FormLabel>
            <strong>Symbol</strong>
          </FormLabel>

          <Input id="symbol" />
        </FormControl>

        <Button colorScheme={"blue"} mt="6" type="submit" isLoading={isLoading}>
          <>Create Collection</>
        </Button>

        {error && (
          <Text mt="1.5" color="red">
            {error?.message}
          </Text>
        )}

        {isSuccess && (
          <Text mt="1.5" color="green">
            Success!
          </Text>
        )}
      </form>
    </Box>
  );
}
