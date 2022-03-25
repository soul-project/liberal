import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";

import { Props } from "../components/RichTextEditor";

const RichTextEditor: ComponentType<Props> = dynamic(
  () => import("../components/RichTextEditor"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function useEditor() {
  const [value, setValue] = useState("Start typing something...");

  return {
    Editor: RichTextEditor,
    publish: () => console.log(value),
    value,
    setValue,
  };
}
