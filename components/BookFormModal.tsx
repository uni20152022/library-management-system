import { FunctionComponent, memo, useCallback, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { BookModel } from "@models";
import { requests } from "@backend";

const formControlLabels: Array<keyof BookModel> = [
  "title",
  "isbn",
  "author",
  "description",
  "copy_number",
  "download_url",
];

interface BookFormModal {
  book?: BookModel;
  onClose: () => void;
  isOpen: boolean;
  isNew: boolean;
  addBook?: (book: BookModel) => void;
  changeBook?: (book: BookModel) => void;
  deleteBook?: (book: BookModel) => void;
}

const BookFormModalFC: FunctionComponent<BookFormModal> = ({
  book,
  onClose,
  isOpen,
  isNew,
  addBook,
  changeBook,
  deleteBook,
}: BookFormModal) => {
  const [formInfo, setFormInfo] = useState(
    isNew
      ? ({
          id: "",
          type: "",
          title: "",
          isbn: "",
          author: "",
          description: "",
          copy_number: "",
          download_url: "",
        } as BookModel)
      : {
          ...book,
        }
  );

  const handleChange = (controlLabel: string, controlValue: string) => {
    setFormInfo((prevState) => ({
      ...prevState,
      [controlLabel]: controlValue,
    }));
  };

  const handleSubmit = useCallback(() => {
    if (isNew) {
      requests
        .post("/books", {
          ...formInfo,
        })
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            if (response.data && response.data.book) {
              addBook && addBook(response.data.book);
            }
            onClose();
          }
        });
    } else {
      requests
        .put(`/books/${book!.id}`, {
          ...formInfo,
        })
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            if (response.data && response.data.book) {
              changeBook && changeBook(response.data.book);
            }
            onClose();
          }
        });
    }
  }, [addBook, book, changeBook, formInfo, isNew, onClose]);

  const handleDelete = useCallback(() => {
    requests
      .delete(`/books/${book ? book.id : formInfo.id}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          deleteBook && deleteBook(book ?? ({} as BookModel));
        }
        onClose();
      });
  }, [book, deleteBook, formInfo.id, onClose]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="book-form-modal-title"
      aria-describedby="book-form-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <FormGroup>
          <FormLabel sx={{ mb: 2, textAlign: "center" }}>
            <Typography variant="h4">
              {(isNew ? "Add" : "Update") + " book"}
            </Typography>
          </FormLabel>
          <FormControl sx={{ mb: 2, mt: 2 }}>
            <InputLabel id="type-select-label">type</InputLabel>
            <Select
              id={`type-input`}
              value={formInfo.type}
              labelId="type-select-label"
              label="type"
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <MenuItem value={"physical"}>physical</MenuItem>
              <MenuItem value={"digital"}>digital</MenuItem>
            </Select>
          </FormControl>
          {formControlLabels.map((controlLabel, index) => (
            <FormControl sx={{ mb: 2, mt: 2 }} key={index}>
              <InputLabel htmlFor={`${controlLabel}-input`}>
                {controlLabel}
              </InputLabel>
              <Input
                id={`${controlLabel}-input`}
                value={formInfo[controlLabel]}
                onChange={(e) => handleChange(controlLabel, e.target.value)}
              />
            </FormControl>
          ))}
          <Button
            type="submit"
            color="primary"
            size="medium"
            variant="contained"
            disableRipple
            disableElevation
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {isNew ? "Add" : "Update"}
          </Button>
          {!isNew && (
            <Button
              type="submit"
              color="error"
              size="medium"
              variant="contained"
              disableRipple
              disableElevation
              sx={{ mt: 1 }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </FormGroup>
      </Box>
    </Modal>
  );
};

export const BookFormModal = memo(
  BookFormModalFC,
  (prevProps, nextProps) =>
    !!prevProps.book &&
    !!nextProps.book &&
    JSON.stringify(prevProps.book) === JSON.stringify(nextProps.book)
);
