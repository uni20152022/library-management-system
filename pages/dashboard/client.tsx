import type { NextPage } from 'next'
import { useEffect } from 'react';
import { useRouter } from 'next/router'

import {
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField
} from '@mui/material';
import { Search } from '@mui/icons-material';

import { useUser } from '@hooks';
import { BookCard } from '@components';

const Client: NextPage = () => {
    const router = useRouter()
    const { user, loading } = useUser()
    useEffect(() => {
        if (!(user || loading)) {
            router.push('/auth');
        }
    }, [user, loading])

    // TODO agree on the model of a book
    const someData = [
        {
            cover: 'memory',
            title: 'The imperfections of memory',
            description: 'In Purgatory he has to piece together his jumbled memories',
        },
        {
            cover: 'memory',
            title: 'The imperfections of memory',
            description: 'In Purgatory he has to piece together his jumbled memories',
        },
        {
            cover: 'memory',
            title: 'The imperfections of memory',
            description: 'In Purgatory he has to piece together his jumbled memories',
        },
        {
            cover: 'memory',
            title: 'The imperfections of memory',
            description: 'In Purgatory he has to piece together his jumbled memories',
        },
        {
            cover: 'memory',
            title: 'The imperfections of memory',
            description: 'In Purgatory he has to piece together his jumbled memories',
        },
        {
            cover: 'memory',
            title: 'The imperfections of memory',
            description: 'In Purgatory he has to piece together his jumbled memories',
        },
        {
            cover: 'memory',
            title: 'The imperfections of memory',
            description: 'In Purgatory he has to piece together his jumbled memories',
        },
        {
            cover: 'memory',
            title: 'The imperfections of memory',
            description: 'In Purgatory he has to piece together his jumbled memories',
        },
        {
            cover: 'memory',
            title: 'The imperfections of memory',
            description: 'In Purgatory he has to piece together his jumbled memories',
        },
        {
            cover: 'memory',
            title: 'The imperfections of memory',
            description: 'In Purgatory he has to piece together his jumbled memories',
        },
    ];

    return (
        <Stack direction="column" sx={{
            minHeight: '100vh',
            minWidth: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
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
                        )
                    }}
                    sx={{
                        mb: 2
                    }}
                    fullWidth
                />
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        someData.map((item, index) => (
                            <Grid item xs={3} key={index}>
                                <BookCard {...item} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </Stack>
    )
}

export default Client
