import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";

import RichTextEditor from "src/components/Editor/RichTextEditor";
import TitleInput from "src/components/Editor/TitleInput";
import { getAPIurl } from "src/utils";

const useEditor = ({ onSuccess, onError, userToken }: Args) => {
  const [contentValue, setContentValue] = useState(
    "<p>Start typing something...</p>"
  );

  const [titleValue, setTitleValue] = useState("");

  const { data, error, isLoading, mutate } = useMutation(
    async () => {
      const { data } = await axios.post(`${getAPIurl()}/api/posts`, {
        content: contentValue,
        title: titleValue,
        token: userToken,
      });
      return data;
    },
    {
      mutationKey: [`${getAPIurl()}/api/posts`, contentValue, titleValue],
      onSuccess,
      onError,
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
      userToken,
    isPublishing: isLoading,
    titleValue,
    setTitleValue,
    data,
    error,
  };
};

export default useEditor;

type Args = {
  onSuccess: () => void;
  onError?: () => void;
  userToken?: string;
};
