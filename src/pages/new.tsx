import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { Check, FileUpload } from "tabler-icons-react";

import useEditor from "../hooks/useEditor";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import Page from "../components/Page";

const New: NextPage = () => {
  const notifications = useNotifications();

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
  });

  return (
    <div>
      <Head>
        <title>Liberal</title>
        <meta
          name="description"
          content="Generated by create next app"
          charSet="utf-8"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Page>
          <NavigationBar
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
          <Box sx={() => ({ padding: "10px 50px 50px 50px" })}>
            <Title value={titleValue} onChange={setTitleValue} />
            <Editor value={contentValue} onChange={setContentValue} />
          </Box>
        </Page>
      </main>
      <Footer />
    </div>
  );
};

export default New;
