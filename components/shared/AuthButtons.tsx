'use client';

import { Button } from '@/components/shared/ui/button';
// import { signOut } from 'next-auth/react';
import Link from './Link';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

interface AuthButtonsProps {
    isAuthenticated: boolean;
    isMobile?: boolean;
    onToggleNav?: () => void;
}

const AuthButtons = ({
    isAuthenticated,
    isMobile,
    onToggleNav,
}: AuthButtonsProps) => {
    const router = useRouter();

    const mobileButtons = (
        <>
            {isAuthenticated ? (
                <Button
                    className="mx-12 my-4 px-12 py-4"
                    variant="destructive"
                    onClick={

                        async () => {
                            await signOut()
                            router.push("/login")

                        }
                    }
                >
                    Sign out
                </Button>
            ) : (
                <Button className="mx-12 my-4 px-12 py-4" onClick={onToggleNav}>
                    <Link href="/login" className="p-4">
                        Login
                    </Link>
                </Button>
            )}
        </>
    );

    const desktopButtons = (
        <>
            {isAuthenticated ? (
                <Button
                    className="hidden sm:flex p-4"
                    variant="destructive"
                    onClick={
                        async () => {
                            await signOut()
                            router.push("/login")

                        }
                    }
                >
                    Sign out
                </Button>
            ) : (
                <Button className="hidden sm:flex">
                    <Link href="/login" className="p-4">
                        Login
                    </Link>
                </Button>
            )}
        </>
    );

    return isMobile ? mobileButtons : desktopButtons;
};

export default AuthButtons;