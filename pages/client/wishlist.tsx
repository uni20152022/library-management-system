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
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { useUser } from "@hooks";
import { BooksTable, Navbar } from "@components";
import { BookModel } from "@models";
import { requests } from "@backend";
import { LOCAL_URL } from "@constants";

const Wishlist: NextPage = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  useEffect(() => {
    if (!(user || loading)) {
      router.push(LOCAL_URL.auth);
    }
  }, [user, loading, router]);

  const [books, setBooks] = useState<Array<BookModel>>([]);

  useEffect(() => {
    requests
      .get("/wishlist")
      .then((res) => res.json())
      .then((response) => {
        setBooks(response.data.wishlists);
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
      <Navbar title={"Wishlist"} />
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
        <BooksTable
          books={books}
          actions={[
            {
              name: "action",
              value: (book: BookModel) => (
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    requests
                      .delete(`/wishlist?book_id=${book.id}`)
                      .then((res) => res.json())
                      .then((response) => {
                        if (response.status) {
                          setBooks((prevState) =>
                            prevState.filter((item) => item.id !== book.id)
                          );
                        }
                      });
                  }}
                >
                  {"Remove from wishlist"}
                </Button>
              ),
            },
          ]}
        />
      </Container>
    </Stack>
  );
};

export default Wishlist;
