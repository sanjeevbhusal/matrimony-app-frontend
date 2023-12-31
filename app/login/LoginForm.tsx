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
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { LoginSchema, loginSchema } from "@/lib/schema/loginSchema";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: LoginSchema) {
    try {
      setLoading(true);
      await login(values);
      const origin = searchParams.get("from") || "/home";
      router.push(origin);
    } catch (e) {
      const error = e as AxiosError<any, any>;

      const statusCode = error.response?.data.statusCode;
      switch (statusCode) {
        case 404:
          form.setError("email", {
            type: "server",
            message: "User with this email doesnot exist",
          });
          break;
        case 401:
          form.setError("password", {
            type: "server",
            message: "Password is invalid",
          });
          break;
        default:
          alert("something went wrong. Please try again later");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            disabled={loading}
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
