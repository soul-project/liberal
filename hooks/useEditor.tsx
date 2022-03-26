import axios from "axios";
import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";
import { useMutation } from "react-query";

import { Props } from "../components/RichTextEditor";

const RichTextEditor: ComponentType<Props> = dynamic(
  () => import("../components/RichTextEditor"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function useEditor() {
  const [value, setValue] = useState("<p>Start typing something...</p>");
  const { data, error, isLoading, mutate } = useMutation(
    async () => {
      const { data } = await axios.post("/api/posts", { content: value });
      return data;
    },
    {
      mutationKey: ["/api/posts", value],
    }
  );
  console.log(data, error);

  return {
    Editor: RichTextEditor,
    publish: mutate,
    value,
    setValue,
    canPublish:
      value !== "<p>Start typing something...</p>" && value !== "<p><br></p>",
    isPublishing: isLoading,
  };
}
