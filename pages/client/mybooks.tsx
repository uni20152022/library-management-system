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

const MyBooks: NextPage = () => {
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
      .get("/booking-details")
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          setBooks(response.booking);
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
      <Navbar title={"My bookings"} />
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
              name: "status",
              value: (book: BookModel) => (
                <Button
                  size="small"
                  variant="text"
                  color="warning"
                  disableRipple
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  {book.booking_details_status}
                </Button>
              ),
            },
            {
              name: "action",
              value: (book: BookModel) => (
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    requests
                      .put(`/booking-details/return?id=${book.id}`, {})
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
                  {"Return"}
                </Button>
              ),
            },
          ]}
        />
      </Container>
    </Stack>
  );
};

export default MyBooks;
