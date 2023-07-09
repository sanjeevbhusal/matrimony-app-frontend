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
import { useAuthentication } from "@/hooks/useAuthentication";
import { Signup, signupSchema } from "@/lib/schema/signupschema";

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

  const onSubmit = async (values: Signup) => {
    try {
      await onSignup(values);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errors = err.response?.data;

        Object.keys(errors).forEach((field) => {
          const errorMessage = errors[field];

          form.setError(field as keyof (typeof signupSchema)["_input"], {
            type: "server",
            message: errorMessage,
          });
        });

        return;
      }

      console.log(err);
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
