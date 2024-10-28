'use client'

import { Authenticator } from '@aws-amplify/ui-react'
import React from 'react'
import '@aws-amplify/ui-react/styles.css'

export const SignInComponent = () => {
    return (
        <div>
            <Authenticator />
        </div>
    )
}