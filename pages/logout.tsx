import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useUser } from "@hooks";
import { LOCAL_URL } from "@constants";

const Logout: NextPage = () => {
  const router = useRouter();
  const { logout } = useUser();

  useEffect(() => {
    logout();
    router.push(LOCAL_URL.auth);
  }, [router, logout]);

  return <></>;
};

export default Logout;
