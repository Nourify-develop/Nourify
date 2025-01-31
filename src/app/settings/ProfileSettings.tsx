"use client";
import Image from "next/image";
import Input, { Button, TextArea } from "../../components/ui/input";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";

const InputFields = [
  { name: "firstName", label: "First Name", Value: "Dave", type: "text" },
  { name: "lastName", label: "Last Name", Value: "Okpata", type: "text" },
  { name: "number", label: "Phone Number", Value: "08037485930", type: "text" },
];

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: " ",
  });
  const [image, setImage] = useState("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImgUpload = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleImgDelete = () => {
    setImage("");
  };

  return (
    <div className="flex flex-col justify-center  gap-5 w-full   pb-10 ">
      <div className="flex flex-col gap-5 justify-center md:items-center">
          <div className="flex gap-[10px] items-center ">
        <div className="md:w-[200px] w-[100px] md:h-[200px] h-[100px] sm:w-[250px] sm:h-[250px] rounded-full border-2 border-green-1">
          {image ? (
            <Image
              src={image}
              alt="User profile picture"
              width={0}
              height={0}
              className="w-full h-full rounded-full object-cover object-center"
            />
          ) : (
            <span className=" rounded-full">
              <FaUser className="w-full h-full  rounded-full pt-10 text-green-1/80" />
            </span>
          )}
        </div>
          <p className="font-medium text-lg md:hidden block">David Okpata</p>
          
          </div>

        <div className=" w-full md:flex items-center justify-center gap-4  flex-col sm:flex-row hidden">
          <div className="sm:w-auto w-full text-center ">
            <input
              type="file"
              id="uploadBtn"
              accept="image/*"
              className="hidden"
              onChange={handleImgUpload}
            />
            <label
              htmlFor="uploadBtn"
              className="inline-block select-none  cursor-pointer rounded-full py-2 px-8  w-full sm:w-auto bg-green-1 border border-green-1 text-white duration-300 hover:bg-green-dark hover:border-green-dark "
            >
              Upload new
            </label>
          </div>
          <Button
            text="Delete avatar"
            border="border-green-1 hover:border-green-dark"
            color="text-green-1 d hover:bg-green-dark  hover:text-white "
            onclick={handleImgDelete}
          />
        </div>
      </div>
      <div className=" ">
        <form action="" className=" space-y-10">
          <div className="grid sm:grid-cols-3 gap-5">
            {InputFields.map((input, index) => (
              <Input
                name={input.name}
                key={index}
                label={input.label}
                value={input.Value}
                type={input.type}
                onchange={handleChange}
              />
            ))}
          </div>
          <TextArea
            name="address"
            label="Residential Address"
            value="Odenigwe, UNN"
          />
          <div className="  w-full flex items-center  justify-between flex-col gap-3 sm:flex-row">
            <Button
              text="Save Changes"
              border="border-green-1 hover:border-green-dark"
              color="text-white"
              bg="bg-green-1 hover:bg-green-dark"
            />
            <div className="flex items-center  gap-3 w-full sm:w-auto flex-row">
              <Button
                text="Delete Account"
                border="border-brown hover:border-[#702200]"
                color="text-white"
                bg="bg-brown hover:bg-[#702200] "
              />
              <Button text="Log out" border="border-brown hover:border-[#702200] hover:bg-[#702200]" color="text-brown hover:text-white" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
