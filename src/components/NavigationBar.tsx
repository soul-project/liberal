import { Box, Button } from "@mantine/core";
import { useLogin } from "@soul-project/react-soul-utils";

import AvatarButton from "./NavigationBar/AvatarButton";

const NavigationBar = ({ primaryButton }: Props) => {
  const { userCredentials, login, logout, loggingIn } = useLogin({
    platformId: 2,
    callback: "http://localhost:3000",
  });

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
        {userCredentials && primaryButton}
        {userCredentials ? (
          <AvatarButton onClick={logout} username={userCredentials.username} />
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
};

type Props = {
  primaryButton: React.ReactNode;
};

export default NavigationBar;
