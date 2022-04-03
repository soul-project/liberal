import { Divider, Text } from "@mantine/core";

export default function NameHeader({ username }: Props) {
  // TODO: If username is not present, do something else
  return (
    <>
      <Text
        sx={() => ({
          color: "white",
          fontSize: "30px",
        })}
      >
        {username}
      </Text>
      <Divider my="sm" />
    </>
  );
}

type Props = {
  username?: string;
};
