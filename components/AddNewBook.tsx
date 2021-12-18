import { FunctionComponent, memo, useCallback, useState } from "react";

import { Button } from "@mui/material";

import { BookFormModal } from "@components";
import { BookModel } from "@models";

const AddNewBookFC: FunctionComponent<{
  addBook: (book: BookModel) => void;
}> = ({ addBook }: { addBook: (book: BookModel) => void }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  return (
    <>
      <Button
        type="button"
        color="primary"
        size="medium"
        variant="contained"
        disableRipple
        disableElevation
        sx={{ mt: 1, mb: 1 }}
        onClick={handleClick}
      >
        Add new book
      </Button>
      <BookFormModal
        isOpen={openModal}
        onClose={handleClose}
        isNew={true}
        addBook={addBook}
      />
    </>
  );
};

export const AddNewBook = memo(AddNewBookFC);
