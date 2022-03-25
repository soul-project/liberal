import { Box, Button } from "@mantine/core";

export default function NavigationBar({ onPublish, disablePublish }: Props) {
  return (
    <Box sx={() => ({ backgroundColor: "white", padding: "20px" })}>
      <Button onClick={onPublish} color="teal" disabled={disablePublish}>
        Publish
      </Button>
    </Box>
  );
}

type Props = {
  onPublish: () => void;
  disablePublish: boolean;
};
