import { Box, Button } from "@mantine/core";

export default function NavigationBar({ onPublish }: Props) {
  return (
    <Box sx={() => ({ backgroundColor: "white", padding: "20px" })}>
      <Button onClick={onPublish} color="teal">
        Publish
      </Button>
    </Box>
  );
}

type Props = {
  onPublish: () => void;
};
