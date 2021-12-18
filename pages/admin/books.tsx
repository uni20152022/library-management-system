import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
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

  const addBook = useCallback(
    (newBook: BookModel) => setBooks((prevState) => [...prevState, newBook]),
    []
  );
  const changeBook = useCallback(
    (book: BookModel) => {
      setBooks((prevState) =>
        prevState.map((item) => (item.id === book.id ? book : item))
      );
    },
    [setBooks]
  );
  const deleteBook = useCallback(
    (book: BookModel) => {
      setBooks((prevState) => prevState.filter((item) => item.id !== book.id));
    },
    [setBooks]
  );

  useEffect(() => {
    requests
      .get("/books/all")
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          setBooks(response.data.books);
        }
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
        <AddNewBook addBook={addBook} />
        <BooksTable
          books={books}
          changeBook={changeBook}
          deleteBook={deleteBook}
        />
      </Container>
    </Stack>
  );
};

export default Books;
