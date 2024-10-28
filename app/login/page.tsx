"use client"

import { SignInComponent } from "@/components/login/SignInComponent"
import { redirect } from "next/navigation";
import 'aws-amplify/auth/enable-oauth-listener';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function SignInPage() {
    const { route, isPending } = useAuthenticator(context => [context.route]);

    if (route === 'authenticated') {
        redirect('/home');
    }

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SignInComponent />
        </div>
    )
}