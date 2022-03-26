import { Box, Button } from "@mantine/core";

export default function NavigationBar({ primaryButton }: Props) {
  return (
    <Box
      sx={() => ({
        padding: "20px",
        backgroundColor: "transparent",
      })}
    >
      {primaryButton}
    </Box>
  );
}

type Props = {
  primaryButton: React.ReactNode;
};
