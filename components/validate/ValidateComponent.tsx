"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '@/components/shared/ui/input';
import { Button } from '@/components/shared/ui/button';
import { Shield } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/shared/ui/form"
import Link from "next/link";
import { redirect, useRouter } from 'next/navigation'
import GoogleLogo from "../../assets/images/google_logo.svg";
import { toast, useToast } from '@/components/shared/ui/use-toast';
import { confirmSignUp } from 'aws-amplify/auth';

interface IValidateComponentProps {
    userEmail: string;
}

const FormSchema = z.object({
    verificationCode: z.string().min(6, {
        message: "Confirmation code must be at least 6 characters.",
    }),
})

export const ValidateComponent = ({ userEmail }: IValidateComponentProps) => {
    console.log("Validate Component: ", userEmail)
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            verificationCode: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username: userEmail,
                confirmationCode: data.verificationCode
            });
            console.log("Validate call: ", isSignUpComplete)
            console.log("Validate call 2: ", nextStep)

            if (isSignUpComplete) {
                toast({
                    title: "Success!",
                    description: "Your account has been verified.",
                })
                router.replace('/login');
            }
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your confirmation.",
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="verificationCode"
                    render={({ field }) => (
                        <FormItem>
                            <div className="relative">
                                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <FormControl>
                                    <Input
                                        placeholder="Enter your verification code"
                                        {...field}
                                        className="bg-[#1A1A1A] border-none text-white pl-10 py-7"
                                    />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="w-full py-2 text-white rounded-lg transition duration-300 ease-in-out font-semibold"
                    type="submit"
                >
                    Confirm
                </Button>
            </form>
        </Form>
    );
};