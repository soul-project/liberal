import { Box, Button } from "@mantine/core";

import Avatar from "./NavigationBar/Avatar";

export default function NavigationBar({ primaryButton }: Props) {
  return (
    <Box
      sx={() => ({
        padding: "30px",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      })}
    >
      <Box>
        <Button component="a" href="/" variant="outline">
          Logo
        </Button>
      </Box>
      <Box
        sx={() => ({
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
        })}
      >
        {primaryButton}
        <Avatar size={30} name="lws803" />
      </Box>
    </Box>
  );
}

type Props = {
  primaryButton: React.ReactNode;
};
