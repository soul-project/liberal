import { Box } from "@mantine/core";

import Footer from "./Footer";

export default function Page({ children, ...props }: Props) {
  return (
    <>
      <Box
        sx={(theme) => ({
          padding: "0px 30px",
          minHeight: "100vh",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[0],
        })}
        {...props}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}

type Props = {
  children?: React.ReactNode;
} & React.ComponentProps<typeof Box>;
