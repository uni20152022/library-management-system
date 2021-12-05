import { FunctionComponent, memo, useCallback, useState } from "react";

import { Button } from "@mui/material";

import { BookFormModal } from "@components";

const AddNewBookFC: FunctionComponent = () => {
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
      <BookFormModal isOpen={openModal} onClose={handleClose} isNew={true} />
    </>
  );
};

export const AddNewBook = memo(AddNewBookFC);
