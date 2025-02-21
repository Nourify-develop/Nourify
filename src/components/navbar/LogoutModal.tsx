"use client";
import { CircleAlert } from "lucide-react";
import React, { useRef, useEffect } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black w-full h-screen bg-opacity-50 flex justify-center items-center z-[1000]">
      <div 
        ref={modalRef}
        className="bg-white p-6 mx-2 flex flex-col items-center gap-y-5 rounded-[12px] shadow-md text-center"
      >
        <div className="p-2 bg-red/20 w-fit rounded-full">
          <CircleAlert className="text-red" />
        </div>
        <div className="mb-3 text-center">
          <p className="font-bold text-xl text-gray-8">{message}</p>
          <p className="text-sm font-medium text-gray-5">
            Are you sure you want to Logout?
          </p>
        </div>
        <div className="flex justify-between w-full font-semibold text-base gap-4">
          <button
            className="border-[1px] border-[#D5D7DA] hover:bg-gray-1 py-2.5 px-8 rounded-[12px] shrink-0"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red hover:bg-dark-red text-white border-[1px] border-red py-2.5 px-8 rounded-[12px] shrink-0"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};