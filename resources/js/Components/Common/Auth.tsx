import { usePage } from '@inertiajs/inertia-react'
import React from 'react'

export default function Auth({ children }: { children: JSX.Element | JSX.Element[] }) {
    const { auth } = usePage().props;
    if (!auth)
        return <></>;
    return (
        <>
            {children}
        </>
    )
}
