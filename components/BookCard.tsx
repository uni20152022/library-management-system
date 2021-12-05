import { FunctionComponent, memo, useCallback, useMemo, useState } from "react";

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import { BookModel } from "@models";

const randomImages = [
  "https://www.jdandj.com/uploads/8/0/0/8/80083458/book-covers-for-authors-in-the-usa-5_orig.jpg",
  "https://picsum.photos/400/300",
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf.jpg?ts=1637012564",
  "https://www.jdandj.com/uploads/8/0/0/8/80083458/book-cover-designers-usa-for-award-winning-books-5_orig.jpg",
  "https://edit.org/photos/img/blog/t9i-edit-book-covers-online.jpg-840.jpg",
  "http://www.designbookcover.pt/uploads/media/photos/cache/reckoning_72_media_huge_thumbnail.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO4yGwkz128dpVHBztwERbm6Z6kIXwQ03V0A&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ9ORIOnNgfHD7jjz5KDO7HIhkJ-OK5FncIw&usqp=CAU",
];

function getRandomImage(id: string): string {
  return randomImages[parseInt(id) % randomImages.length];
}

const BookCardFC: FunctionComponent<{ book: BookModel }> = ({ book }) => {
  const [openSnackbarReason, setOpenSnackbarReason] = useState<string | null>(
    null
  );
  const coverImage = useMemo(() => getRandomImage(book.id), []);

  const handleBook = useCallback(() => {
    setOpenSnackbarReason("booked");
    // TODO book on backend
  }, []);

  const handleAddToWishlist = useCallback(() => {
    setOpenSnackbarReason("added to wishlist");
    // TODO add to wishlist on backend
  }, []);

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={book.title}
        sx={{
          "& .MuiCardHeader-title": {
            maxWidth: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }}
      />
      <CardMedia component="img" height="250" image={coverImage} alt="cover" />
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {book.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button size="small" variant="contained" onClick={handleBook}>
          Book this book
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={handleAddToWishlist}
        >
          Add to wishlist
        </Button>
      </CardActions>
      <Snackbar
        open={Boolean(openSnackbarReason)}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbarReason(null)}
      >
        <Alert
          onClose={() => setOpenSnackbarReason(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          You successfully {openSnackbarReason} {book.title}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export const BookCard = memo(
  BookCardFC,
  (prevProps, nextProps) => prevProps.book.id === nextProps.book.id
);
