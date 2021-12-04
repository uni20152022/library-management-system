import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Typography
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import Image from 'next/image'

import cover from '../public/cover.jpg'

interface BookProps {
    title: string;
    cover: string;
    description: string;
}

export const BookCard = ({ title, description }: BookProps) => {
    return (
        <Card>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={title}
                subheader="September 14, 2016"
            />
            {/*<CardMedia*/}
            {/*    component="img"*/}
            {/*    height="194"*/}
            {/*    image="../public/cover.jpg"*/}
            {/*    alt="cover"*/}
            {/*/>*/}
            <CardContent>
                {/*<Typography variant="h5" gutterBottom>*/}
                {/*    {title}*/}
                {/*</Typography>*/}
                <Image src={cover} width={250} />
                <Typography variant="body1">
                    { description }
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Book</Button>
            </CardActions>
        </Card>
    )
}
