"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '@/components/shared/ui/input';
import { Button } from '@/components/shared/ui/button';
import { Mail, Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shared/ui/form"
import Link from "next/link";
import { useRouter } from 'next/navigation'
import GoogleLogo from "../../assets/images/google_logo.svg";
// import { signIn } from "next-auth/react"
import { useToast } from '@/components/shared/ui/use-toast';
import { signIn, signInWithRedirect } from "aws-amplify/auth"

const FormSchema = z.object({
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

export const Login = () => {
  const router = useRouter()
  const { toast } = useToast();


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // const signInData = await signIn('credentials', {
    //   email: data.email,
    //   password: data.password,
    //   redirect: false
    // });
    try {
      const { isSignedIn  } = await signIn({
        username: data.email,
        password: data.password,
      })

      console.log("Sign in result: ", isSignedIn)

      if (isSignedIn) {
        router.push('/home')
      } else {
        // got to the home page
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
        });
      }
    } catch (error) {
      console.log("Error: ",error)
      toast({
        variant: "destructive",
        title: "NotAuthorizedException",
        description: "Incorrect username or password.",
      })
    }

  }

  // const loginWithGoogle = () => signIn("google", {
  //   callbackUrl: "http://localhost:3000/home"
  // });

  const loginWithGoogle = async () => {
    await signInWithRedirect({ provider: "Google" })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <FormControl>
                  <Input
                    placeholder="Email address"
                    {...field}
                    className="bg-[#1A1A1A] border-none text-white pl-10"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className="bg-[#1A1A1A] border-none text-white pl-10"
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
          Login
        </Button>
        <button
          className="border w-full flex justify-center items-center gap-3 p-3"
          onClick={loginWithGoogle}
        >
          <div className="rounded">
            <GoogleLogo />
          </div>
          <p className="text-gray-400">
            Sign in with google
          </p>
        </button>
        <p className="text-center text-gray-400 mb-6">
          Don’t have an account yet? <Link href="/contact_us" className="text-primary-300/70">Sign up</Link>
        </p>
      </form>
    </Form>
  );
};