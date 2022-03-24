import { useMemo, useState } from "react";
import Editor, { Quill } from "@mantine/rte";
import MarkdownShortcuts from "quill-markdown-shortcuts";

export default function RichTextEditor() {
  const [value, setValue] = useState("Start typing something...");
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
      placeholder="Start typing something..."
      onChange={setValue}
      modules={modules}
      controls={[
        ["bold", "italic", "underline", "link", "image"],
        ["unorderedList", "h1", "h2", "h3"],
        ["sup", "sub"],
        ["code", "codeBlock"],
      ]}
    />
  );
}
