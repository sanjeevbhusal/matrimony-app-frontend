"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import Link from "next/link";
import { LoginSchema, loginSchema } from "@/lib/schema/loginSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login } from "@/api/auth";
// import { User } from "@/types";

export default function LoginForm() {
  // const queryClient = useQueryClient();
  // const location = useLocation();
  // const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const loginMutation = useMutation(login, {
  //   onSuccess: (data: User) => {
  //     queryClient.setQueryData(["user"], data);
  //     const origin = location.state?.from?.pathname || "/dashboard";
  //     navigate(origin);
  //   },
  //   onError: (error: unknown) => {
  //     if (axios.isAxiosError(error)) {
  //       const statusCode = error.response?.data.statusCode;

  //       switch (statusCode) {
  //         case 404:
  //           form.setError("email", {
  //             type: "server",
  //             message: "User with this email doesnot exist",
  //           });
  //           break;
  //         case 401:
  //           form.setError("password", {
  //             type: "server",
  //             message: "Password is invalid",
  //           });
  //           break;
  //         default:
  //           alert("somthing went wrong. Please try again later");
  //       }
  //     } else {
  //       // handle other errors (eg: network error)
  //     }
  //   },
  // });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <div className="mt-8">
          <Button
            type="submit"
            className="border border-red-500 bg-white text-red-500 hover:bg-white"
            // disabled={loginMutation.isLoading}
          >
            Login
          </Button>
        </div>

        <h1 className="mt-8 text-sm">
          New to Everlasting Ties?
          <Link href="/signup">
            <span className=" ml-2 text-blue-600">Create an account.</span>
          </Link>
        </h1>
        <h1 className="mt-2 text-sm">
          Forgot your password?
          <Link href="/forgot-password">
            <span className=" ml-2 text-blue-600">Reset Password</span>
          </Link>
        </h1>
      </form>
    </Form>
  );
}
