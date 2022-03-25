import { Box, Button } from "@mantine/core";

export default function NavigationBar({ onPublish, canPublish }: Props) {
  return (
    <Box
      sx={(theme) => ({
        padding: "20px",
        backgroundColor: "transparent",
      })}
    >
      <Button onClick={onPublish} color="teal" disabled={!canPublish}>
        Publish
      </Button>
    </Box>
  );
}

type Props = {
  onPublish: () => void;
  canPublish: boolean;
};
