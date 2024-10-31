"use client"

import { SignInComponent } from "@/components/login/SignInComponent"
import { redirect } from "next/navigation";
import 'aws-amplify/auth/enable-oauth-listener';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function SignInPage() {
    const { route } = useAuthenticator(context => [context.route]);

    if (route === 'authenticated') {
        redirect('/home');
    }

    return (
        <div>
            <SignInComponent />
        </div>
    )
}