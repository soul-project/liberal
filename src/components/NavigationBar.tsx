import { Box, Button } from "@mantine/core";
import ClientOnly from "./ClientOnly";

import AvatarButton from "./NavigationBar/AvatarButton";

const NavigationBar = ({
  primaryButton,
  onLogin,
  onLogout,
  username,
  isLoggingIn,
}: Props) => {
  return (
    <ClientOnly>
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
          {username && primaryButton}
          {username ? (
            <AvatarButton onClick={onLogout} username={username} />
          ) : (
            <Button
              onClick={onLogin}
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              loading={isLoggingIn}
            >
              Login
            </Button>
          )}
        </Box>
      </Box>
    </ClientOnly>
  );
};

type Props = {
  primaryButton: React.ReactNode;
  username?: string;
  onLogout: () => void;
  onLogin: () => void;
  isLoggingIn: boolean;
};

export default NavigationBar;
