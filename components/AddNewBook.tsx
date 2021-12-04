import { useState } from 'react';

import { Button } from '@mui/material';
import { BookFormModal } from './BookFormModal';

export const AddNewBook = () => {
    const [openModal, setOpenModal] = useState(false);

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
                onClick={() => setOpenModal(true)}
            >
                Add new book
            </Button>
            <BookFormModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                isNew={true}
            />
        </>
    )
}