import { useMemo } from "react";
import Editor, { Quill } from "@mantine/rte";
import MarkdownShortcuts from "quill-markdown-shortcuts";

const RichTextEditor = ({ onChange, value }: Props) => {
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
      onChange={onChange}
      modules={modules}
      controls={[
        ["bold", "italic", "underline", "link"],
        ["unorderedList", "h1", "h2", "h3"],
        ["code", "codeBlock"],
      ]}
    />
  );
};

export type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default RichTextEditor;
