'use client'

import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import config from '../amplify_outputs.json'

Amplify.configure(config, { ssr: true })

export const Auth = ({ children }: { children: React.ReactNode }) => {
    return (
        <Authenticator.Provider>
            {children}
        </Authenticator.Provider>
    )
}