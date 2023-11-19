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
import { useAuth } from "@/hooks/useAuth";
import { API_URL } from "@/lib/constants";
import {
  thirdOnboardingStepSchema,
  ThirdOnboardingStepSchema,
} from "@/lib/schema/ThirdOnboardingStepSchema";
import { useUploadThing } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
      image: new File([], ""),
    },
  });

  const { user, fetchUser } = useAuth();
  const { startUpload } = useUploadThing("imageUploader");

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

  async function onSubmit(values: ThirdOnboardingStepSchema) {
    // lets add the image to upload thing url.
    try {
      const fileUploadResponse = await startUpload([values.image]);
      if (!fileUploadResponse) {
        throw new Error("File upload failed");
      }
      await axios.patch(`${API_URL}/users/${user?.id}`, {
        ...values,
        image: fileUploadResponse[0].url,
      });
      // refetch the user again
      await fetchUser();
      onSuccess();
    } catch (error) {
      alert("Something went wrong");
    } finally {
    }
  }

  console.log(form.getValues());

  return (
    <main className="mx-auto border-red-500 xl:w-[35rem]">
      <h1 className="text-center text-2xl font-bold">
        Lets get to know your personal details more
      </h1>

      <div className="mt-8 rounded-lg border border-[#CFCFCF] px-10 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      accept=".jpg, .jpeg, .png, .svg,"
                      type="file"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-8">
              <Button
                type="submit"
                className="border border-red-500 bg-white text-red-500 hover:bg-white"
                disabled={form.formState.isSubmitting}
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
