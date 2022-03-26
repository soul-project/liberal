import { Box, Button } from "@mantine/core";

import AvatarButton from "./NavigationBar/AvatarButton";

import useLogin from "../hooks/useLogin";

export default function NavigationBar({ primaryButton }: Props) {
  const { username, login, logout, loggingIn } = useLogin();

  return (
    <Box
      sx={() => ({
        padding: "30px",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      })}
    >
      <Box>
        <Button component="a" href="/" variant="outline">
          Logo
        </Button>
      </Box>
      <Box
        sx={() => ({
          display: "flex",
          flexDirection: "row",
          gap: "18px",
          alignItems: "center",
        })}
      >
        {primaryButton}
        {username ? (
          <AvatarButton onClick={logout} username={username} />
        ) : (
          <Button
            onClick={login}
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            loading={loggingIn}
          >
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
}

type Props = {
  primaryButton: React.ReactNode;
};
