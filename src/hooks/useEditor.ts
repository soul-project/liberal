import axios from "axios";
import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";
import { useMutation } from "react-query";

import useLogin from "./useLogin";
import { Props } from "../components/Editor/RichTextEditor";
import TitleInput from "../components/Editor/TitleInput";

const RichTextEditor: ComponentType<Props> = dynamic(
  () => import("../components/Editor/RichTextEditor"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function useEditor({ onSuccess }: { onSuccess: () => void }) {
  const [contentValue, setContentValue] = useState(
    "<p>Start typing something...</p>"
  );
  const { userId } = useLogin();
  const [titleValue, setTitleValue] = useState("");

  const { data, error, isLoading, mutate } = useMutation(
    async () => {
      const { data } = await axios.post("/api/posts", {
        content: contentValue,
        title: titleValue,
        userId,
      });
      return data;
    },
    {
      mutationKey: ["/api/posts", contentValue, titleValue],
      onSuccess,
    }
  );

  return {
    Editor: RichTextEditor,
    Title: TitleInput,
    publish: mutate,
    contentValue,
    setContentValue,
    canPublish:
      contentValue !== "<p>Start typing something...</p>" &&
      contentValue !== "<p><br></p>" &&
      titleValue !== "" && // TODO: add better validation for this
      userId,
    isPublishing: isLoading,
    titleValue,
    setTitleValue,
    data,
    error,
  };
}
