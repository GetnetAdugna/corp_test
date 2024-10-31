'use client'

import {
    Authenticator,
    Heading,
    View,
    ThemeProvider,
    Theme,
    useTheme,
} from '@aws-amplify/ui-react'
import React from 'react'
import '@aws-amplify/ui-react/styles.css'
import { headerFont } from "@/data/config/fonts";

const components = {
    SignIn: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    <div className="flex justify-center items-center">
                        <h1
                            className={`${headerFont.className} text-4xl sm:text-4xl font-bold tracking-tight text-center inline-flex`}
                        >
                            Welcome Back
                        </h1>
                    </div>
                </Heading>
            );
        },
    },
}


export const SignInComponent = () => {
    const { tokens } = useTheme();
    const theme: Theme = {
        name: 'Auth Theme',
        tokens: {
            components: {
                authenticator: {
                    router: {
                        boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
                        borderWidth: '0',
                    },
                    form: {
                        padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
                    },
                },
                button: {
                    primary: {
                        backgroundColor: { value: '#0B867C' },
                    },
                },
                tabs: {
                    item: {
                        color: tokens.colors.black['80'],
                        _active: {
                            borderColor: tokens.colors.neutral['100'],
                            color: { value: '#0B867C' },
                        },
                    },
                },
            },
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <View padding="xxl">
                <Authenticator components={components} />
            </View>
        </ThemeProvider>
    )
}