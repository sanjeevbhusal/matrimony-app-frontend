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
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "@/hooks/useAuth";
import { Login, loginSchema } from "@/lib/schema/loginSchema";

export default function LoginForm() {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { onLogin } = useAuthentication();

  const onSubmit = async (values: Login) => {
    try {
      await onLogin(values);
    } catch (err: unknown) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.data.statusCode;

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
            alert("somthing went wrong. Please try again later");
        }
      } else {
        console.log("yes");
        // handle other errors (eg: network error)
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

        <h1 className="mt-8 text-sm">
          New to Everlasting Ties?
          <Link to="/signup">
            <span className=" ml-2 text-blue-600">Create an account.</span>
          </Link>
        </h1>
        <h1 className="mt-2 text-sm">
          Forgot your password?
          <Link to="/forgot-password">
            <span className=" ml-2 text-blue-600">Reset Password</span>
          </Link>
        </h1>
      </form>
    </Form>
  );
}
