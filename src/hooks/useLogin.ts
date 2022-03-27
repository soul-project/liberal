import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const useLogin = ({ platformId, callback }: Args) => {
  const [
    {
      "soul-token": soulToken,
      "soul-refresh-token": soulRefreshToken,
      "soul-cached-credentials": soulCachedCredentials,
    },
    setCookie,
    removeCookies,
  ] = useCookies([
    "soul-token",
    "soul-refresh-token",
    "soul-cached-credentials",
  ]);
  const [userCredentials, setUserCredentials] = useState<{
    username: string;
    userId: number;
    token: string;
  }>();
  const [loggingIn, setIsLoggingIn] = useState(false);

  // verify code from callback
  useEffect(() => {
    const login = async (code: string) => {
      setIsLoggingIn(true);
      const {
        data: { accessToken, refreshToken },
      } = await axios.post(
        `http://api.soul-network.com/v1/auth/verify?callback=${callback}&code=${code}`
      );
      setCookie("soul-token", accessToken, { path: "/" });
      setCookie("soul-refresh-token", refreshToken, { path: "/" });

      if (window?.open !== undefined && window?.location !== undefined) {
        const url = window.location.origin + window.location.pathname;
        window.open(url, "_self");
      }
      setIsLoggingIn(false);
    };

    const params = getSearchParams<{ code: string }>();
    if (params.code) login(params.code);
  }, [callback, setCookie, setIsLoggingIn]);

  // get user credentials
  useEffect(() => {
    const obtainNewAccessToken = async () => {
      try {
        console.log("Session expired, obtaining refresh token");
        const {
          data: { accessToken },
        } = await axios.post(
          `https://api.soul-network.com/v1/auth/refresh?platformId=${platformId}`,
          { refreshToken: soulRefreshToken }
        );
        setCookie("soul-token", accessToken, { path: "/" });
      } catch (_error) {
        removeCookies("soul-refresh-token");
      }
    };

    const loginAndSetUsername = async () => {
      setIsLoggingIn(true);
      try {
        const {
          data: { username, id },
        } = await axios.get("https://api.soul-network.com/v1/users/me", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${soulToken}`,
          },
        });
        const credentials = {
          username,
          userId: id,
          token: soulToken,
        };
        setUserCredentials(credentials);
        setCookie("soul-cached-credentials", credentials, { path: "/" });
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401 &&
          error.response?.data.error === "UNAUTHORIZED_ERROR" &&
          soulRefreshToken
        ) {
          obtainNewAccessToken();
        }
        removeCookies("soul-token");
      }
      setIsLoggingIn(false);
    };

    if (soulToken) {
      loginAndSetUsername();
    } else {
      removeCookies("soul-cached-credentials");
    }
  }, [
    soulRefreshToken,
    soulToken,
    removeCookies,
    setCookie,
    setIsLoggingIn,
    platformId,
  ]);

  useEffect(() => {
    setUserCredentials(soulCachedCredentials);
  }, [soulCachedCredentials]);

  const login = () => {
    if (window?.open !== undefined) {
      window.open(
        `https://login.soul-network.com/?platformId=${platformId}&callback=${callback}`,
        "_self"
      );
    }
  };

  const logout = () => removeCookies("soul-token");

  return { login, logout, loggingIn, ...userCredentials };
};

export default useLogin;

type Args = {
  platformId: number;
  callback: string;
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
