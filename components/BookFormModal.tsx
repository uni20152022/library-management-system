import { useState } from 'react';

import {
    Box,
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Input,
    InputLabel, MenuItem,
    Modal,
    Select,
    Typography
} from '@mui/material';

const formControlLabels = [
    'title',
    'isbn',
    'author',
    'description',
    'copy_number',
]

export const BookFormModal = ({ book, onClose, isOpen, isNew }: any) => {

    const [formInfo, setFormInfo] = useState(isNew ? {
        type: '',
        title: '',
        isbn: '',
        author: '',
        description: '',
        copy_number: '',
    } : {
        ...book,
    });

    const handleChange  = (controlLabel: string, controlValue: string) => {
        setFormInfo((prevState: object) => ({
            ...prevState,
            [controlLabel]: controlValue
        }))
    }

    const handleSubmit = () => {
        // TODO update or add this book
        onClose();
    }

    const handleDelete = () => {
        // TODO delete this book
        onClose();
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="book-form-modal-title"
            aria-describedby="book-form-modal-description"
        >
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <FormGroup>
                    <FormLabel sx={{ mb: 2, textAlign: 'center' }}>
                        <Typography variant="h4">
                            { (isNew ? 'Add' : 'Update') + ' book' }
                        </Typography>
                    </FormLabel>
                    <FormControl sx={{ mb: 2, mt: 2 }}>
                        <InputLabel id="type-select-label">type</InputLabel>
                        <Select
                            id={`type-input`}
                            value={formInfo.type}
                            labelId="type-select-label"
                            label="type"
                            onChange={(e) => handleChange('type', e.target.value)}
                        >
                            <MenuItem value={"physical"}>physical</MenuItem>
                            <MenuItem value={"digital"}>digital</MenuItem>
                        </Select>
                    </FormControl>
                    { formControlLabels.map((controlLabel, index) => (
                        <FormControl sx={{ mb: 2, mt: 2 }} key={index}>
                            <InputLabel htmlFor={`${controlLabel}-input`}>{controlLabel}</InputLabel>
                            <Input id={`${controlLabel}-input`}
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
                        onClick={handleSubmit.bind({})}
                    >
                        { isNew ? 'Add' : 'Update' }
                    </Button>
                    {
                        !isNew && (
                            <Button
                                type="submit"
                                color="error"
                                size="medium"
                                variant="contained"
                                disableRipple
                                disableElevation
                                sx={{ mt: 1 }}
                                onClick={handleSubmit.bind({})}
                            >
                                Delete
                            </Button>
                        )
                    }
                </FormGroup>
            </Box>
        </Modal>
    );
}