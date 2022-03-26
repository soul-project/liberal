import { Box, Button } from "@mantine/core";

export default function NavigationBar({
  onPublish,
  canPublish,
  isPublishing,
}: Props) {
  return (
    <Box
      sx={() => ({
        padding: "20px",
        backgroundColor: "transparent",
      })}
    >
      <Button
        onClick={onPublish}
        color="teal"
        disabled={!canPublish}
        loading={isPublishing}
      >
        Publish
      </Button>
    </Box>
  );
}

type Props = {
  onPublish: () => void;
  canPublish: boolean;
  isPublishing: boolean;
};
