import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

import useEditor from "../hooks/useEditor";
import NavigationBar from "../components/NavigationBar";

const Home: NextPage = () => {
  const notifications = useNotifications();

  const { Editor, publish, value, setValue, canPublish, isPublishing } =
    useEditor({
      onSuccess: () => {
        notifications.showNotification({
          title: "Post submitted",
          message: "Your article will be made available soon",
          icon: <Check size={18} />,
          color: "teal",
        });
      },
    });

  // TODO: Move this to new-page url, and also have it such then after submission it redirects you
  // to the url that you just published to.
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
        <Box
          sx={(theme) => ({
            height: "100vh",
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[0],
          })}
        >
          <NavigationBar
            onPublish={publish!}
            canPublish={canPublish}
            isPublishing={isPublishing}
          />
          <Box sx={() => ({ padding: "50px", height: "90%" })}>
            <Editor value={value} onChange={setValue} />
          </Box>
        </Box>
      </main>
      <Box
        sx={(theme) => ({
          display: "flex",
          flex: 1,
          padding: "2rem 0",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[1],
        })}
      >
        <Text
          variant="link"
          component="a"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          rel="noopener noreferrer"
          sx={() => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            color: "white",
          })}
        >
          Powered by{" "}
          <Text
            component="span"
            sx={() => ({
              height: "1em",
              marginLeft: "0.5rem",
            })}
          >
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </Text>
        </Text>
      </Box>
    </div>
  );
};

export default Home;
