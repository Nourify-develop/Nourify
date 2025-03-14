"use client";
import FormInput from "@/components/custom/formInput";
import { Button } from "@/components/ui/button";
import { adminSignUpSchema } from "@/validations/adminValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdminSignUpTypes } from "@/types";
import { usePostMutation } from "@/hooks/useApi";
import { ADMIN_AUTH } from "@/config/API_ENDPOINTS";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AdminSignUp() {
  const { mutate, isPending } = usePostMutation(ADMIN_AUTH.SIGN_UP, "sign_up");


console.log("Mutation function:", mutate); // Check if mutate exists
console.log("Is pending state:", isPending);

if (!mutate) {
  console.error("🚨 Mutate function is undefined!");
}
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AdminSignUpTypes>({
    resolver: yupResolver(adminSignUpSchema),
  });

  const handleFormSubmit = async (data: AdminSignUpTypes) => {
    try {
      await mutate({ ...data, isAdmin: true });
    } catch (error) {
      toast.error(`Error during sign-up: ${error}`);
    }
  };

  const handleRegister = (data: AdminSignUpTypes) => {
    console.log("🔵 Submitting form data:", data);
  
    mutate(
      { ...data, isAdmin: true },
      {
        onSuccess: (response) => {
          console.log("✅ Mutation successful:", response);
          toast.success("Admin sign-up successful!");
        },
        onError: (error) => {
          console.error("❌ Mutation failed:", error);
          toast.error(`Error during sign-up: ${error.message || error}`);
        },
      }
    );
  };
  
  

  return (
    <div>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(handleRegister)}
      >
        <FormInput
          type="text"
          label="First Name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <FormInput
          type="text"
          label="Last Name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <FormInput
          type="email"
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <FormInput
          type="password"
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />

        <span className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("agreeToTerms")}
            id="check"
            className="h-4 w-4 border border-gray-300 checked:bg-green-1"
          />
          <label htmlFor="check" className="text-lg">
            Do you agree to the terms?
          </label>
          {errors.agreeToTerms?.message && (
            <span className="mt-1 text-red">
              {errors.agreeToTerms?.message}
            </span>
          )}
        </span>

        <button type="submit" className="rounded-full text-lg focus:border focus:border-black bg-secondary-2 py-2.5">
          {isPending ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
