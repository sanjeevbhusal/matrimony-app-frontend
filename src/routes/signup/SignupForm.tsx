import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { API_URL } from "@/lib/constants";
import { Link } from "react-router-dom";

const formSchema = z
  .object({
    firstName: z.string().trim().min(1, "Please enter a valid first name"),
    lastName: z.string().trim().min(1, "Please enter a valid last name"),
    // .regex(
    //   new RegExp("^([a-zA-Z]+)\\s([a-zA-Z]+)(?:\\s([a-zA-Z]+))?$"),
    //   "FullName should be either 2 or 3 words."
    // ),
    email: z.string().trim().email("Please enter a valid email address"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be between 8-20 characters")
      .max(20, "Password must be between 8-20 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password should match Password",
    path: ["confirmPassword"],
  });

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`${API_URL}/authentication/signup`, values);
      alert("succesfull signup. Now proceed to login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errors = err.response?.data;

        Object.keys(errors).forEach((field) => {
          const errorMessage = errors[field];

          form.setError(field as keyof (typeof formSchema)["_input"], {
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
