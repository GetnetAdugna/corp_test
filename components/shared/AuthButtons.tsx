'use client';

import { Button } from '@/components/shared/ui/button';
import Link from './Link';
import { useRouter } from 'next/navigation';
import { useAuthenticator } from '@aws-amplify/ui-react';

interface AuthButtonsProps {
    isMobile?: boolean;
    onToggleNav?: () => void;
}

const AuthButtons = ({
    isMobile,
    onToggleNav,
}: AuthButtonsProps) => {
    const router = useRouter();
    const { user, isPending, signOut } = useAuthenticator((context) => [context.user]);

    if (!isPending && !user) {
        router.push("/login")
    }

    const mobileButtons = (
        <>
            {user ? (
                <Button
                    className="mx-12 my-4 px-12 py-4"
                    variant="destructive"
                    onClick={
                        () => {
                            signOut()
                            localStorage.clear();
                        }
                    }
                >
                    {isPending ? 'Loading..' : 'Sign out'}
                </Button>
            ) : (
                <Button className="mx-12 my-4 px-12 py-4" onClick={onToggleNav}>
                    <Link href="/login" className="p-4">
                        {isPending ? 'Loading..' : 'Login'}
                    </Link>
                </Button>
            )}
        </>
    );

    const desktopButtons = (
        <>
            {user ? (
                <Button
                    className="hidden sm:flex p-4"
                    variant="destructive"
                    onClick={
                        () => {
                            signOut()
                            localStorage.clear();
                        }
                    }
                >
                    {isPending ? 'Loading..' : 'Sign out'}
                </Button>
            ) : (
                <Button className="hidden sm:flex">
                    <Link href="/login" className="p-4">
                        {isPending ? 'Loading..' : 'Login'}
                    </Link>
                </Button>
            )}
        </>
    );

    return isMobile ? mobileButtons : desktopButtons;
};

export default AuthButtons;