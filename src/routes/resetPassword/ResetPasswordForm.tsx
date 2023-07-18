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
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { API_URL } from "@/lib/constants";

const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, "Password must be between 8-20 characters")
      .max(20, "Password must be between 8-20 characters"),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password should match Password",
    path: ["confirmPassword"],
  });

type ValidationSchema = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const urlSearchParams = useSearchParams()[0];

  const onSubmit = async (values: ValidationSchema) => {
    const resetPasswordToken = urlSearchParams.get("token");

    try {
      await axios.post(
        `${API_URL}/authentication/resetPassword?token=${resetPasswordToken}`,
        values
      );
      alert("Password has been reset Succesfully. You can proceed to login");
      form.reset();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert("something went wrong. Please try again later");
        // const statusCode = err.response?.data.statusCode;

        // switch (statusCode) {
        //   case 404:
        //     form.setError("email", {
        //       type: "server",
        //       message: "User with this email doesnot exist",
        //     });
        //     break;
        //   case 401:
        //     form.setError("password", {
        //       type: "server",
        //       message: "Password is invalid",
        //     });
        //     break;
        //   default:
        //     alert("somthing went wrong. Please try again later");
        // }
      } else {
        // handle other errors (eg: network error)
      }
    }
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
          >
            Reset Password
          </Button>
        </div>
        <h1 className="mt-8 text-sm">
          Remeber your password?
          <Link to="/login">
            <span className=" ml-2 text-blue-600">Login</span>
          </Link>
        </h1>
      </form>
    </Form>
  );
}
