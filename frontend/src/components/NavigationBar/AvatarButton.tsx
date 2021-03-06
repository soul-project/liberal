import { UnstyledButton, Text } from "@mantine/core";

import Avatar from "./Avatar";

export default function AvatarButton({ onClick, username }: Props) {
  return (
    <UnstyledButton
      onClick={onClick}
      sx={() => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
      })}
    >
      <Avatar size={30} name={username} />
      <Text
        weight="bold"
        sx={() => ({
          maxWidth: "150px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        })}
      >
        {username}
      </Text>
    </UnstyledButton>
  );
}

export type Props = {
  onClick: () => void;
  username: string;
};
