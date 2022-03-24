import { useState } from "react";
import { Box, Button } from "@mantine/core";

import RichTextEditor from "./Editor/RichTextEditor";

export default function Editor() {
  const [value, setValue] = useState("Start typing something...");
  // TODO: add publish button and title input

  return (
    <Box sx={() => ({ height: "90%" })}>
      <Button
        color="lime"
        sx={() => ({ marginBottom: "20px" })}
        onClick={() => console.log(value)}
      >
        Publish
      </Button>
      <RichTextEditor onChange={setValue} value={value} />
    </Box>
  );
}
