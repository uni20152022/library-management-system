import type { NextPage } from 'next'
import { useEffect } from 'react';
import { useRouter } from 'next/router'

import { useUser } from '@hooks';
import { LOCAL_URL } from '@constants';

const Home: NextPage = () => {
    const router = useRouter()
    const { user, userRole, loading } = useUser()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push(LOCAL_URL.auth)
            } else {
                // TODO identify role
                userRole === 'admin' && router.push(LOCAL_URL.dashboard.admin);
                userRole !== 'admin' && router.push(LOCAL_URL.dashboard.client);
            }
        }
    }, [user, loading])

    return (
        <></>
    )
}

export default Home
