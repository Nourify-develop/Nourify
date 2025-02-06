import FormInput from "@/components/custom/formInput";
import { Button } from "@/components/ui/button";


export default function AdminLogin() {
  return (
    <div>
      <form className="w-full flex flex-col gap-4">
        <FormInput 
          type="email"
          label="Email"
        />
        <FormInput 
          type="password"
          label="Password"
        />

        <Button type="submit" variant="default" className="rounded-full">Submit</Button>
      </form>
    </div>
  );
}
