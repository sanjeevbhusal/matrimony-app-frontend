import { updateUser } from "@/api/user";
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
import { useAuthentication } from "@/hooks/useAuth";
import {
  thirdOnboardingStepSchema,
  ThirdOnboardingStepSchema,
} from "@/lib/schema/ThirdOnboardingStepSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function ThirdOnboardingStep({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<ThirdOnboardingStepSchema>({
    resolver: zodResolver(thirdOnboardingStepSchema),
    defaultValues: {
      age: 0,
      highestEducation: "",
      currentProfession: "",
      currentAddress: "",
    },
  });

  const { user } = useAuthentication();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      if (user.age) {
        form.setValue("age", user.age);
      }

      if (user.highestEducation) {
        form.setValue("highestEducation", user.highestEducation);
      }

      if (user.currentAddress) {
        form.setValue("currentAddress", user.currentAddress);
      }

      if (user.currentProfession) {
        form.setValue("currentProfession", user.currentProfession);
      }
    }
  }, [user, form]);

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      // We should now redirect user to dashboard page. That is only possible if we have all the values in User object. The values are available at server but not on client. Hence, refetching.
      queryClient.invalidateQueries(["user"]);
      onSuccess();
    },
  });

  return (
    <main className="mx-auto border-red-500 xl:w-[35rem]">
      <h1 className="text-center text-2xl font-bold">
        Lets get to know your personal details more
      </h1>

      <div className="mt-8 rounded-lg border border-[#CFCFCF] px-10 py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              updateUserMutation.mutate({
                updatedProperties: values,
                userId: user?.id as number,
              })
            )}
          >
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value === 0 ? "" : field.value}
                      type="number"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="highestEducation"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Highest Education</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="currentProfession"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Current Profession</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="currentAddress"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Current Address</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="mt-8">
              <Button
                type="submit"
                className="border border-red-500 bg-white text-red-500 hover:bg-white"
                disabled={updateUserMutation.isLoading}
              >
                Complete Registration
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export { ThirdOnboardingStep };
