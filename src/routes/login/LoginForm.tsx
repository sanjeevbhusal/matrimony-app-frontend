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
import { Link } from "react-router-dom";
import { useAuthentication } from "@/hooks/useAuthentication";
import { Login, loginSchema } from "@/lib/schema/loginSchema";

export default function LoginForm() {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { onLogin } = useAuthentication();

  const onSubmit = async (values: Login) => {
    try {
      await onLogin(values);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorInfo = err.response?.data;

        console.log(errorInfo);

        switch (errorInfo.error) {
          case "Not Found":
            form.setError("email", {
              type: "server",
              message: "User with this email doesnot exist",
            });
            break;
          case "Unauthorized":
            form.setError("password", {
              type: "server",
              message: errorInfo.message,
            });
        }
        return;
      }
    }
  };

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
        ></FormField>
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
              {/* <FormDescription>
                  Password must be between 8-20 characters
                </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <div className="mt-8">
          <Button
            type="submit"
            className="border border-red-500 bg-white text-red-500 hover:bg-white"
          >
            Login
          </Button>
        </div>
        <Link to="/signup">
          <h1 className="mt-8 text-sm">
            New to Everlasting Ties?
            <span className=" ml-2 text-blue-600">Create an account.</span>
          </h1>
        </Link>
      </form>
    </Form>
  );
}
