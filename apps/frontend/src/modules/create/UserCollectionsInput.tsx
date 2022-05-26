import { Select, Skeleton } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useUserCollectionsQuery } from "../../../generated/graphql";

export default function UserCollectionsInput() {
  const { data: accountData } = useAccount();
  if (!accountData?.address) throw new Error("User should be connected");

  const [{ data, fetching }] = useUserCollectionsQuery({
    variables: { owner: accountData.address.toLowerCase() },
  });

  return (
    <Skeleton isLoaded={!fetching}>
      <Select placeholder="Select Collection">
        {data?.collections.map(({ id, name }, key) => (
          <option value={id} key={key}>
            {name}
          </option>
        ))}
      </Select>
    </Skeleton>
  );
}
