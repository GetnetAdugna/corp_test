"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '@/components/shared/ui/input';
import { toast } from "@/components/shared/ui/use-toast"
import { Button } from '@/components/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/ui/form"
import Link from "next/link";
import { signUp } from "aws-amplify/auth"
import { redirect, useRouter } from "next/navigation";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters long." })
    .max(20, { message: "Password must be at most 20 characters long." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .regex(/[\W_]/, { message: "Password must contain at least one special character." }),
})

export const Contact = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { nextStep, isSignUpComplete, userId } = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email
          }
        }
      });

      console.log("Sign up", nextStep)
      console.log("Sign up", isSignUpComplete)
      console.log("Sign up", userId)

      if (userId) {
        toast({
          title: "Success!",
          description: "Check your email for a verification code...",
        })
        router.push(`/validate/${encodeURIComponent(data.email)}`);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your registration.",
        })
      }

    } catch (err) {
      console.log(err)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your registration.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full font-semibold p-6 mt-6 text-secondary rounded-md transition duration-300 ease-in-out">
          Sign Up
        </Button>
        <p className="text-center text-gray-400 mb-6">
          Do you have an account? <Link href="/login" className="text-primary-300/70">Login</Link>
        </p>
      </form>
    </Form>
  );
};