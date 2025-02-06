"use client";
import { CircleAlert } from "lucide-react";
import React, { useState } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-6 mx-2 flex flex-col gap-y-5 rounded-[12px] shadow-md text-center">
        <div className="p-2 bg-red/20 w-fit rounded-full">
          <CircleAlert className="text-red" />
        </div>
        <div className="mb-3">
          <p className="font-bold text-xl text-gray-8">{message}</p>
          <p className="text-sm font-medium text-gray-5">
            Are you sure you want to remove this item?{" "}
            <br className="inline-block md:hidden" /> This action{" "}
            <br className="hidden md:inline-block" /> cannot be undone.
          </p>
        </div>
        <div className="flex justify-between w-full font-semibold text-base gap-4">
          <button
            className="border-[1px] border-[#D5D7DA] py-2.5 px-8 rounded-full shrink-0"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red text-white border-[1px] border-red py-2.5 px-8 rounded-full shrink-0"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
