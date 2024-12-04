import { ValidateComponent } from '@/components/validate/ValidateComponent'
import { headerFont } from '@/data/config/fonts'
import React from 'react'

interface IValidateProp {
    params: { username: string };
}

export default async function Validate({ params }: IValidateProp) {

    const decodedEmail = decodeURIComponent(params.username);

    return (
        <div className="w-full flex flex-col items-center fancy-overlay space-y-8 pb-36">
            <div className="flex justify-center items-center">
                <h1
                    className={`${headerFont.className} text-5xl font-bold tracking-tight text-white text-center inline-flex`}
                >
                    Confirm Your Registration
                </h1>
            </div>
            <div className="w-full pt-10 px-3 pb-24 sm:max-w-xl">
                <ValidateComponent userEmail={decodedEmail} />
            </div>
        </div>
    );
}