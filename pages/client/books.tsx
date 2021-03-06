import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { useUser } from "@hooks";
import { BookCard, Navbar } from "@components";
import { LOCAL_URL } from "@constants";
import { requests } from "@backend";
import { BookModel } from "@models";

const Books: NextPage = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  useEffect(() => {
    if (!(user || loading)) {
      router.push(LOCAL_URL.auth);
    }
  }, [user, loading, router]);

  const [books, setBooks] = useState<Array<BookModel>>([]);

  const _alterBookById = useCallback((id: string) => {
    requests
      .get(`/books/all/${id}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          setBooks((prevState) =>
            prevState.map((item) =>
              item.id === id ? response.data.book : item
            )
          );
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const changeBookingStatus = useCallback(
    (id: string) => {
      _alterBookById(id);
    },
    [_alterBookById]
  );

  const changeWishlistStatus = useCallback(
    (id: string) => {
      _alterBookById(id);
    },
    [_alterBookById]
  );

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
      <Navbar title={"List of all books"} />
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
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {books.map((item, index) => (
            <Grid item xs={3} key={index}>
              <BookCard
                book={item}
                changeBookingStatus={changeBookingStatus}
                changeWishlistStatus={changeWishlistStatus}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
};

export default Books;
