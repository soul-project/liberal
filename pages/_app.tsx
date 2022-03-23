import type { AppProps } from "next/app";
import { Global, MantineProvider } from "@mantine/core";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Global
        styles={(theme) => ({
          body: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          },
        })}
      />

      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
