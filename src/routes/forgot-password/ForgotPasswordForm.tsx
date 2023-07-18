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
import { API_URL } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

type ValidationSchema = z.infer<typeof ForgotPasswordSchema>;

function ForgotPasswordForm() {
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ValidationSchema) => {
    try {
      await axios.post(`${API_URL}/authentication/forgot-password`, values);
      form.reset();
      alert("Email has been sent.");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.data.statusCode;

        switch (statusCode) {
          case 404:
            form.setError("email", {
              type: "server",
              message: "User with this email doesnot exist",
            });
            break;

          default:
            alert("Something wrong happened. Please try again later");
        }
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
          >
            Get Email
          </Button>
        </div>
        <h1 className="mt-8 text-sm">
          Remebered your password?
          <Link to="/login">
            <span className=" ml-2 text-blue-600">Login</span>
          </Link>
        </h1>
      </form>
    </Form>
  );
}

export { ForgotPasswordForm };
