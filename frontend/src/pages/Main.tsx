import React from "react";
import { File } from "tabler-icons-react";
import { Button } from "@mantine/core";
import { useLogin } from "@soul-project/react-soul-utils";

import NavigationBar from "src/components/NavigationBar";
import Page from "src/components/Page";

function Main() {
  const { login, isLoggingIn, logout, userCredentials } = useLogin({
    platformId: 2,
    callback: "http://localhost:3000",
  });

  return (
    <Page>
      <NavigationBar
        username={userCredentials?.username}
        onLogin={login}
        onLogout={logout}
        isLoggingIn={isLoggingIn}
        primaryButton={
          <Button component="a" href="/new" rightIcon={<File />}>
            New Article
          </Button>
        }
      />
    </Page>
  );
}

export default Main;
