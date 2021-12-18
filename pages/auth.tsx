import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Stack } from "@mui/material";

import { LoginForm, RegisterForm } from "@components";
import { useUser } from "@hooks";
import { requests } from "@backend";
import { useCallback, useState } from "react";
import { LOCAL_URL } from "@constants";

const Auth: NextPage = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSubmit = useCallback(
    ({ login, password }: { login: string; password: string }) => {
      requests
        .post(isLoginForm ? "/login" : "/register", {
          login,
          password,
        })
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            setUser({
              username: login,
              token: response["api-token"],
              role: response["role"],
            });
            router.push(
              response["role"] === "admin"
                ? LOCAL_URL.admin.home
                : LOCAL_URL.client.home
            );
          }
        })
        .catch((e) => console.log(e));
    },
    [isLoginForm, setUser, router]
  );

  const toggleFormType = useCallback(() => {
    setIsLoginForm((prevState) => !prevState);
  }, []);

  return (
    <Stack
      direction="column"
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "30%",
          p: 2,
          border: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoginForm && (
          <LoginForm
            handleSubmit={handleSubmit}
            toggleFormType={toggleFormType}
          />
        )}
        {!isLoginForm && (
          <RegisterForm
            handleSubmit={handleSubmit}
            toggleFormType={toggleFormType}
          />
        )}
      </Box>
    </Stack>
  );
};

export default Auth;
