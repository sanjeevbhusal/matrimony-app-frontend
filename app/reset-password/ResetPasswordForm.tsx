import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import Link from "next/link";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/lib/schema/resetPasswordSchema";
import { useMutation } from "@tanstack/react-query";
// import { resetPassword } from "@/api/auth";

export default function ResetPasswordForm({
  resetPasswordToken,
}: {
  resetPasswordToken: string;
}) {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // const resetPasswordMutation = useMutation(resetPassword, {
  //   onSuccess: () => {
  //     alert("Password has been reset Succesfully. You can proceed to login");
  //     form.reset();
  //   },
  //   onError: (error: unknown) => {
  //     if (axios.isAxiosError(error)) {
  //       alert("something went wrong. Please try again later");
  //     }
  //   },
  // });

  const onSubmit = async (values: ResetPasswordSchema) => {
    resetPasswordMutation.mutate({ payload: values, resetPasswordToken });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormDescription>
                Password must be between 8-20 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <div className="mt-8">
          <Button
            type="submit"
            className="border border-red-500 bg-white text-red-500 hover:bg-white"
            // disabled={resetPasswordMutation.isLoading}
          >
            Reset Password
          </Button>
        </div>
        <h1 className="mt-8 text-sm">
          Remeber your password?
          <Link href="/login">
            <span className=" ml-2 text-blue-600">Login</span>
          </Link>
        </h1>
      </form>
    </Form>
  );
}
