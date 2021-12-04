import { useEffect, useState } from 'react';

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { BookFormModal } from '@components';

export const BooksTable = ({ rows }: any) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openRow, setOpenRow] = useState(null);

    const handleRowClick = (row: any) => {
        setIsModalOpen(true);
        setOpenRow(row.id);
    }

    useEffect(() => {
        console.log(openRow);
    }, [openRow]);

    const clearOpenRow = () => {
        setIsModalOpen.call({},false);
        setOpenRow(null);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>type</TableCell>
                        <TableCell>title</TableCell>
                        <TableCell>isbn</TableCell>
                        <TableCell>author</TableCell>
                        <TableCell>description</TableCell>
                        <TableCell>copy_number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any, index: number) => (
                        <TableRow
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onClick={() => handleRowClick(row)}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.isbn}</TableCell>
                            <TableCell>{row.author}</TableCell>
                            <TableCell sx={{
                                maxWidth: "100px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}>{row.description}</TableCell>
                            <TableCell>{row.copy_number}</TableCell>
                            <BookFormModal
                                book={row}
                                onClose={clearOpenRow.bind({})}
                                isOpen={isModalOpen && row.id === openRow}
                                isNew={false}
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
