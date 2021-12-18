import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { useUser } from "@hooks";
import { Navbar, UsersTable } from "@components";
import { UserModel } from "@models";
import { requests } from "@backend";
import { LOCAL_URL } from "@constants";

const Users: NextPage = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  useEffect(() => {
    if (!(user || loading)) {
      router.push(LOCAL_URL.auth);
    }
  }, [user, loading, router]);

  const [users, setUsers] = useState<Array<UserModel>>([]);

  useEffect(() => {
    requests
      .get("/users")
      .then((res) => res.json())
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((e) => console.log(e));
  }, []);

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
      <Navbar title={"Manage users"} />
      <Container sx={{ p: 10 }}>
        <TextField
          label="Search bar"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
          }}
          fullWidth
        />
        <UsersTable
          users={users}
          actions={[
            {
              name: "status",
              value: (user: UserModel) => (
                <Tooltip title="Toggle status" arrow>
                  <Button
                    size="small"
                    variant="text"
                    color={user.restricted_until ? "error" : "success"}
                    disableRipple
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      requests
                        .post(
                          user.restricted_until
                            ? `/activate-user`
                            : `/restrict-user`,
                          {
                            user_id: user.id,
                          }
                        )
                        .then((res) => res.json())
                        .then((response) => {
                          if (response.status) {
                            requests
                              .get(`/users/${user.id}`)
                              .then((res) => res.json())
                              .then((response) => {
                                const changedUser = response.data
                                  .user as UserModel;
                                if (response.status) {
                                  setUsers((prevState) =>
                                    prevState.map((item) =>
                                      item.id === changedUser.id
                                        ? changedUser
                                        : item
                                    )
                                  );
                                }
                              });
                          }
                        });
                    }}
                  >
                    {user.restricted_until ? "Restricted" : "Active"}
                  </Button>
                </Tooltip>
              ),
            },
          ]}
        />
      </Container>
    </Stack>
  );
};

export default Users;
