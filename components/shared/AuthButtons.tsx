"use client"

import { Button } from '@/components/shared/ui/button';
import Link from './Link';
import { useRouter } from 'next/navigation';
import { useAuthenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { signOut } from '@aws-amplify/auth';
import { fetchAuthSession } from '@aws-amplify/auth';
import { useEffect, useState, useTransition } from 'react';
import { Hub } from 'aws-amplify/utils';

interface AuthButtonsProps {
    isMobile?: boolean;
    onToggleNav?: () => void;
    isUserAuthenticated: boolean;
}

const AuthButtons = ({
    isMobile,
    onToggleNav,
    isUserAuthenticated
}: AuthButtonsProps) => {
    const [authCheck, setAuthCheck] = useState(isUserAuthenticated);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();
    useEffect(() => {
        const hubListenerCancel = Hub.listen("auth", (data) => {
            console.log("Hub Data: ", data)
            switch (data.payload.event) {
                case "signedIn":
                    setAuthCheck(true);
                    // startTransition(() => router.push("/home"));
                    startTransition(() => router.refresh());
                    break;
                case "signedOut":
                    setAuthCheck(false);
                    startTransition(() => router.push("/"));
                    startTransition(() => router.refresh());
                    break;
            }
        });

        return () => hubListenerCancel();
    }, [router]);

    async function handleSignOut() {
        if (authCheck) {
            await signOut()
            localStorage.clear();
        } else {
            router.push("/login")
        }
    }

    const mobileButtons = (
        <>
            {authCheck ? (
                <Button
                    className="mx-12 my-4 px-12 py-4"
                    variant="destructive"
                    onClick={handleSignOut}
                >
                    {isPending ? "loading.." : "Sign out"}
                </Button>
            ) : (
                <Button className="mx-12 my-4 px-12 py-4" onClick={onToggleNav}>
                    <Link href="/login" className="p-4">
                        {isPending ? "loading.." : "Login"}
                    </Link>
                </Button>
            )}
        </>
    );

    const desktopButtons = (
        <>
            {authCheck ? (
                <Button
                    className="hidden sm:flex p-4"
                    variant="destructive"
                    onClick={handleSignOut}
                >
                    {isPending ? "loading.." : "Sign out"}

                </Button>
            ) : (
                <Button className="hidden sm:flex">
                    <Link href="/login" className="p-4">
                        {isPending ? "loading.." : "Login"}
                    </Link>
                </Button>
            )}
        </>
    );

    return isMobile ? mobileButtons : desktopButtons;
};

export default AuthButtons;