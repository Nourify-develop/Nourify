import React, { useState } from "react";
import { FaLock } from "react-icons/fa6";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface inputFields {
  name: string;
  label: string;
  type?: string;
  value?: string;
  onchange?: React.ChangeEventHandler<HTMLInputElement>;
}
interface btn {
  bg?: string;
  border?: string;
  text: string;
  color?: string;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
}
const Input = (props: inputFields) => {
  return (
    <div className="text-sm flex flex-col gap-2">
      <label htmlFor={props.name} className="text-primary-2/80">
        {props.label}
      </label>
      <input
        type={props.type}
        className="rounded-full input-field_ bg-primary-2/5 border border-primary-2/5 p-4 focus:outline-0 "
        placeholder={props.label}
        id={props.name}
        defaultValue={props.value}
        onChange={props.onchange}
      />
    </div>
  );
};

export default Input;
export const TextArea = (props: inputFields) => {
  return (
    <div className="text-sm flex flex-col gap-2">
      <label htmlFor={props.name} className="text-primary-2/80">
        {props.label}
      </label>

      <textarea
        name={props.name}
        className="rounded-lg border border-primary-2/5  resize-none input-field_ bg-primary-2/5 text-primary-2/50 p-4 focus:outline-0"
        id={props.name}
        cols={30}
        rows={5}
      >
        {props.value}
      </textarea>
    </div>
  );
};

export const Button = (props: btn) => {
  return (
    <button
      onClick={props.onclick}
      className={`rounded-full py-2 px-8  w-full sm:w-auto ${props.bg} border-2 ${props.border} ${props.color}  duration-300`}
    >
      {props.text}
    </button>
  );
};