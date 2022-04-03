import { useEffect, useRef } from "react";
import { Box, Button } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { Check, FileUpload, X } from "tabler-icons-react";
import { useLogin } from "@soul-project/react-soul-utils";
import { useNavigate } from "react-router-dom";

import useEditor from "./New/useEditor";
import NavigationBar from "src/components/NavigationBar";
import Page from "src/components/Page";

export default function New() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInputRef.current) titleInputRef.current.focus();
  }, []);

  const { login, isLoggingIn, logout, userCredentials, token } = useLogin({
    platformId: 2,
    callback: "http://localhost:3000",
  });

  useEffect(() => {
    if (!userCredentials) navigate("/");
  }, [navigate, userCredentials]);

  const {
    Editor,
    publish,
    contentValue,
    setContentValue,
    canPublish,
    isPublishing,
    Title,
    titleValue,
    setTitleValue,
  } = useEditor({
    onSuccess: () => {
      notifications.showNotification({
        title: "Post submitted",
        message: "Your article will be made available soon",
        icon: <Check size={18} />,
        color: "teal",
      });
    },
    onError: () => {
      notifications.showNotification({
        title: "Post failed",
        message: "Something went wrong",
        icon: <X size={18} />,
        color: "red",
      });
    },
    userToken: token,
  });

  return (
    <Page>
      <NavigationBar
        username={userCredentials?.username}
        onLogin={login}
        onLogout={logout}
        isLoggingIn={isLoggingIn}
        primaryButton={
          <Button
            onClick={() => publish()}
            color="teal"
            disabled={!canPublish}
            loading={isPublishing}
            rightIcon={<FileUpload />}
          >
            Publish
          </Button>
        }
      />
      <Box
        sx={() => ({
          padding: "10px 30px 30px 30px",
        })}
      >
        <Box
          sx={() => ({
            maxWidth: "800px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          })}
        >
          <Title
            value={titleValue}
            onChange={setTitleValue}
            ref={titleInputRef}
          />
          <Editor value={contentValue} onChange={setContentValue} />
        </Box>
      </Box>
    </Page>
  );
}
