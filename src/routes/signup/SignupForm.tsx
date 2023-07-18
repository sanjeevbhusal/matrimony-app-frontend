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
  FormDescription,
} from "@/components/ui/form";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthentication } from "@/hooks/useAuth";
import { Signup, signupSchema } from "@/lib/schema/signupschema";
import { useState } from "react";

export default function SignupForm() {
  const form = useForm<Signup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { onSignup } = useAuthentication();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: Signup) => {
    setLoading(true);

    try {
      await onSignup(values);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.data.statusCode;

        switch (statusCode) {
          case 409:
            form.setError("email", {
              type: "server",
              message:
                "This Email is already in use. Please use a different email.",
            });
            break;
          default:
            alert("somthing went wrong. Please try again later");
        }
      } else {
        // handle other errors (eg: network error)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Password must be between 8-20 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>ConfirmPassword</FormLabel>
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
            disabled={loading}
          >
            Create Account
          </Button>
        </div>

        <Link to="/login">
          <h1 className="mt-8 text-sm">
            Already have an account?
            <span className=" ml-2 text-blue-600">Log In</span>
          </h1>
        </Link>
      </form>
    </Form>
  );
}
