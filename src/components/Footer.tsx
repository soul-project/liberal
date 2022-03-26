import { Box, Text, Image } from "@mantine/core";

export default function Footer() {
  return (
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
  );
}
