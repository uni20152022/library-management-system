import { FunctionComponent, memo, useCallback, useState } from "react";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BookFormModal } from "@components";
import { BookModel } from "@models";
import { useUser } from "@hooks";

const BooksTableFC: FunctionComponent<{
  books: Array<BookModel>;
  actions?: Array<any>;
  changeBook?: (book: BookModel) => void;
  deleteBook?: (book: BookModel) => void;
}> = ({
  books,
  actions,
  changeBook,
  deleteBook,
}: {
  books: Array<BookModel>;
  actions?: Array<any>;
  changeBook?: (book: BookModel) => void;
  deleteBook?: (book: BookModel) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openRow, setOpenRow] = useState(null);

  const { userRole } = useUser();

  const handleRowClick = useCallback((row: any) => {
    setIsModalOpen(true);
    setOpenRow(row.id);
  }, []);

  const clearOpenRow = useCallback(() => {
    setIsModalOpen.call({}, false);
    setOpenRow(null);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>type</TableCell>
            <TableCell>title</TableCell>
            <TableCell>isbn</TableCell>
            <TableCell>author</TableCell>
            <TableCell>description</TableCell>
            <TableCell>copy_number</TableCell>
            {actions &&
              actions.map((action, index) => (
                <TableCell key={index}>{action.name}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book: any, index: number) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => {
                if (userRole === "admin") {
                  handleRowClick(book);
                }
              }}
            >
              <TableCell component="th" scope="row">
                {book.id}
              </TableCell>
              <TableCell>{book.type}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell
                sx={{
                  maxWidth: "100px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {book.description}
              </TableCell>
              <TableCell>{book.copy_number}</TableCell>
              {actions &&
                actions.map((action, index) => (
                  <TableCell key={index}>{action.value(book)}</TableCell>
                ))}
              <BookFormModal
                book={book}
                onClose={clearOpenRow}
                isOpen={isModalOpen && book.id === openRow}
                isNew={false}
                changeBook={changeBook}
                deleteBook={deleteBook}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const BooksTable = memo(
  BooksTableFC,
  (prevProps, nextProps) =>
    prevProps.books.length === nextProps.books.length &&
    prevProps.books.every(
      (prevBook, index) =>
        !!prevBook &&
        !!nextProps.books[index] &&
        JSON.stringify(prevBook) === JSON.stringify(nextProps.books[index])
    )
);
