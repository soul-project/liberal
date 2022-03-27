import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const PLATFORM_ID = 2;
const CALLBACK = "http://localhost:3000";

const useLogin = () => {
  const [cookies, setCookie, removeCookies] = useCookies(["soul-token"]);
  const [userCredentials, setUserCredentials] = useState<{
    username: string;
    userId: number;
    token: string;
  }>();
  const [loggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const login = async (code: string) => {
      setIsLoggingIn(true);
      const {
        data: { accessToken },
      } = await axios.post(
        `http://api.soul-network.com/v1/auth/verify?callback=${CALLBACK}&code=${code}`
      );
      setCookie("soul-token", accessToken, { path: "/" });
      if (window?.open !== undefined && window?.location !== undefined) {
        const url = window.location.origin + window.location.pathname;
        window.open(url, "_self");
      }
      setIsLoggingIn(false);
    };

    const params = getSearchParams<{ code: string }>();
    if (params.code) login(params.code);
  }, [setCookie, setIsLoggingIn]);

  useEffect(() => {
    const loginAndSetUsername = async () => {
      setIsLoggingIn(true);
      try {
        const {
          data: { username, id },
        } = await axios.get("https://api.soul-network.com/v1/users/me", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookies["soul-token"]}`,
          },
        });
        setUserCredentials({
          username,
          userId: id,
          token: cookies["soul-token"],
        });
      } catch (_error) {
        removeCookies("soul-token");
      }
      setIsLoggingIn(false);
    };
    if (cookies["soul-token"]) {
      loginAndSetUsername();
    } else {
      setUserCredentials(undefined);
    }
  }, [cookies, removeCookies, setIsLoggingIn]);

  const login = () => {
    if (window?.open !== undefined) {
      window.open(
        `https://login.soul-network.com/?platformId=${PLATFORM_ID}&callback=${CALLBACK}`,
        "_self"
      );
    }
  };

  const logout = () => removeCookies("soul-token");

  // TODO: Consider trying for refresh token when we can't login

  return { login, logout, loggingIn, ...userCredentials };
};

const getSearchParams = <T extends object>(): Partial<T> => {
  // server side rendering
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);

  return new Proxy(params, {
    get(target, prop, _receiver) {
      return target.get(prop as string) || undefined;
    },
  }) as T;
};

export default useLogin;
