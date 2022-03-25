import { useState } from "react";
import { Box } from "@mantine/core";

export default function useEditor() {
  const [value, setValue] = useState("Start typing something...");

  if (typeof window !== "undefined") {
    // eslint-disable-next-line import/extensions, global-require
    const RichTextEditor = require("../components/RichTextEditor").default;
    return {
      editor: (
        <Box sx={() => ({ height: "90%" })}>
          <RichTextEditor onChange={setValue} value={value} />
        </Box>
      ),
      publish: () => console.log(value),
    };
  }

  return { editor: null, publish: null };
}
