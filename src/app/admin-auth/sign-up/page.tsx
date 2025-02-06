import FormInput from "@/components/custom/formInput";
import { Button } from "@/components/ui/button";


export default function AdminSignUp() {
  return (
    <div>
      <form className="w-full flex flex-col gap-4">
        <FormInput
          type="text"
          label="First Name"
        />
        <FormInput
          type="text"
          label="Last Name"
        />
        <FormInput
          type="email"
          label="Email"
        />
        <FormInput
          type="password"
          label="Password"
        />

        <span className="flex items-center gap-2">
          <input type="checkbox" name="check" id="check" className="h-4 w-4 border border-gray-300 checked:bg-green-1" />
          <label htmlFor="check" className="text-lg">Do you agree to the terms?</label>
        </span>

        <Button type="submit" variant="default" className="rounded-full text-lg">Register</Button>
      </form>
    </div>
  );
}
