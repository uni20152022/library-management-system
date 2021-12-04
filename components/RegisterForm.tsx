import { useState } from 'react';

import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    InputLabel,
    Input,
    Typography
} from '@mui/material';

interface RegisterFormProps {
    handleSubmit: (credentials: { login: string, password: string }) => void,
    toggleFormType: () => void,
}

export const RegisterForm = ({ handleSubmit, toggleFormType }: RegisterFormProps) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return (
        <FormGroup>
            <FormLabel sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="h4">
                    Register
                </Typography>
            </FormLabel>
            <FormControl sx={{ mb: 1 }}>
                <InputLabel htmlFor="login-input">Login</InputLabel>
                <Input id="login-input" onChange={(e) => setLogin(e.target.value)} required autoFocus />
            </FormControl>
            <FormControl sx={{ mt: 1 }}>
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input id="password-input" onChange={(e) => setPassword(e.target.value)} type="password" required />
            </FormControl>
            <Button
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                disableRipple
                disableElevation
                sx={{ mt: 2 }}
                onClick={() => handleSubmit({ login, password })}
            >
                Register
            </Button>

            <Button
                type="button"
                color="secondary"
                size="medium"
                variant="text"
                disableRipple
                disableElevation
                sx={{ mt: 1 }}
                onClick={() => toggleFormType()}
            >
                Already have an account?
            </Button>
        </FormGroup>
    )
}