import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Stack } from '@mui/material';

import { LoginForm, RegisterForm } from '@components';
import { useUser } from '@hooks';
import { requests } from '@backend';
import { useState } from 'react';

const Auth: NextPage = () => {

    const router = useRouter()
    const { userRole, setUser } = useUser();
    const [isLoginForm, setIsLoginForm] = useState(true);

    const handleSubmit = ({ login, password }: { login: string, password: string }) => {
        // TODO identify role

        requests.post(isLoginForm ? '/login' : '/register', {
            login,
            password
        }).then((response) => {
            console.log(response);
            // setUser({ username: login, token: response['api-token'], role: response['role'] }
            const userRole = 'admin'; // TODO remove this bs
            router.push(`/dashboard/${userRole}`);
        }).catch((e) => console.log(e));
    }

    const toggleFormType = () => {
        setIsLoginForm(prevState => !prevState);
    }

    return (
        <Stack direction="column" sx={{
            minHeight: '100vh',
            minWidth: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '30%',
                p: 2,
                border: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                { isLoginForm && <LoginForm handleSubmit={handleSubmit} toggleFormType={toggleFormType} /> }
                { !isLoginForm && <RegisterForm handleSubmit={handleSubmit} toggleFormType={toggleFormType} /> }
            </Box>
        </Stack>
    )
}

export default Auth
