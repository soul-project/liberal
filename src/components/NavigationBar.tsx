import { Box } from "@mantine/core";

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
      Logo
      {primaryButton}
    </Box>
  );
}

type Props = {
  primaryButton: React.ReactNode;
};
