import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { useUser } from "@hooks";
import { AddNewBook, BooksTable, Navbar } from "@components";
import { BookModel } from "@models";
import { requests } from "@backend";
import { LOCAL_URL } from "@constants";

const Books: NextPage = () => {
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
      .get("/books/all")
      .then((res) => res.json())
      .then((response) => {
        setBooks(response.data.books);
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
      <Navbar title={"Manage books"} />
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
        <AddNewBook />
        <BooksTable books={books} />
      </Container>
    </Stack>
  );
};

export default Books;
