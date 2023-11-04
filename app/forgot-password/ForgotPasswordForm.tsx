"use client";

// import { forgotPassword } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/lib/schema/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";

function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // const forgotPasswordMutation = useMutation(forgotPassword, {
  //   onSuccess: () => {
  //     form.reset();
  //     alert("Email has been sent.");
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

  //         default:
  //           alert("Something wrong happened. Please try again later");
  //       }
  //     }
  //   },
  // });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          forgotPasswordMutation.mutate(values)
        )}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <div className="mt-8">
          <Button
            type="submit"
            className="border border-red-500 bg-white text-red-500 hover:bg-white"
            // disabled={forgotPasswordMutation.isLoading}
          >
            Get Email
          </Button>
        </div>
        <h1 className="mt-8 text-sm">
          Remebered your password?
          <Link href="/login">
            <span className=" ml-2 text-blue-600">Login</span>
          </Link>
        </h1>
      </form>
    </Form>
  );
}

export { ForgotPasswordForm };
