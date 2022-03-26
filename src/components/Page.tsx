import { Box } from "@mantine/core";

export default function Page({ children, ...props }: Props) {
  return (
    <Box
      sx={(theme) => ({
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
  );
}

type Props = {
  children?: React.ReactNode;
} & React.ComponentProps<typeof Box>;
