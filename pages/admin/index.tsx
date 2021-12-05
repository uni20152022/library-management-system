import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useUser } from "@hooks";
import { LOCAL_URL } from "@constants";
import { Navbar } from "@components";
import { Container, Stack, Typography } from "@mui/material";

const Home: NextPage = () => {
  const router = useRouter();
  const { userRole, user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(LOCAL_URL.auth);
      }
    }
  }, [user, loading, router]);

  return (
    <Stack
      direction="column"
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Navbar title={"Home admin"} />
      <Container sx={{ p: 10 }}>
        <Typography variant="h6">{user}</Typography>
        <Typography variant="h6">{userRole}</Typography>
      </Container>
    </Stack>
  );
};

export default Home;
