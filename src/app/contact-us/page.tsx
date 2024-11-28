"use client";
import React, { useState } from "react";
import Wrapper from "@/layout/wrapper";
import { Button } from "../../components/ui/input";
import { IoMdArrowDropdown } from "react-icons/io";
import { inputFields } from "./_data";

interface FormValues {
  name: string;
  selectValue: string;
  message: string;
}
const page = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    selectValue: "",
    message: "",
  });

  const handleInputChange =
    (field: keyof FormValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
    setFormValues({
      name: "",
      selectValue: "",
      message: "",
    });
  };

  return (
    <div>
      <section
        className="w-full h-[60vh] bg-black bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/contact-us-background-image.svg')",
        }}
      >
        {/* Overlay for darkening effect */}
        <Wrapper className="absolute  bg-[#00000060] w-full h-full z-10 ">
          <div className="  flex flex-col h-full justify-end ">
            <h1 className="text-[2.5rem] md:text-[5rem] font-bold text-white uppercase ">
              contact <span className="text-yellow">us</span>{" "}
            </h1>
          </div>
        </Wrapper>
      </section>
      <Wrapper className="flex flex-col justify-center items-center">
        <h1 className="text-[2.5rem] font-bold ">Got a Question?</h1>
        <h2 className="text-[1.3rem] md:text-[1.563rem] mb-[4rem]">
          We're here to help. You can email us using the form below.
        </h2>
        <div className="flex flex-col  w-[80%]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {inputFields.map(({ name, placeholder, type }) => (
              <input
                type={type}
                key={name}
                value={formValues[name as keyof FormValues]}
                placeholder={placeholder}
                onChange={handleInputChange(name as keyof FormValues)}
                className="input-field placeholder:text-sm p-4 w-full h-full rounded-[50px] focus:outline-0 appearance-none hover:bg-gray-200 transition-colors ease-in duration-150 "
                required
              />
            ))}
            <label htmlFor="subject" className="mt-3 inline-block">
              Subject
            </label>
            <div className="relative w-full">
              <select
                name="Other"
                id="Other"
                aria-placeholder="Other"
                value={formValues.selectValue}
                onChange={handleInputChange("selectValue")}
                className="placeholder:text-sm text-sm text-gray-3 p-4 w-full h-full rounded-[50px] appearance-none focus:outline-0 bg-gray-1  hover:bg-gray-200 transition-colors ease-in duration-150 "
              >
                <option value="" disabled hidden>
                  Other
                </option>
                <option value="Other">Other</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
              </select>
              <span>
                <IoMdArrowDropdown className="text-gray-3 absolute right-8 top-4" />
              </span>
                        
            </div>
            <textarea
              name="Message"
              id="Message"
              placeholder="Message"
              value={formValues.message}
              onChange={handleInputChange("message")}
              className="input-field placeholder:text-sm px-4 pt-4 pb-24 w-full h-full rounded-[30px] focus:outline-0 bg-gray-1  hover:bg-gray-200 transition-colors ease-in duration-150 "
            ></textarea>

            <Button
              text="Send Message"
              border="border-green-1 hover:border-green-dark"
              color="text-white"
              bg="bg-green-1"
            />
          </form>
        </div>
      </Wrapper>
    </div>
  );
};

export default page;
