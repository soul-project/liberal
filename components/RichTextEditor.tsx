import { useMemo, useState } from "react";
import Editor, { Quill } from "@mantine/rte";
import MarkdownShortcuts from "quill-markdown-shortcuts";

export default function RichTextEditor() {
  const [value, setValue] = useState("Hello world");
  const modules = useMemo(
    () => ({
      history: { delay: 2500, userOnly: true },
      markdownShortcuts: {},
      // syntax: true,
    }),
    []
  );
  Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

  return (
    <Editor
      sx={() => ({
        height: "100%",
      })}
      value={value}
      onChange={setValue}
      modules={modules}
    />
  );
}
