"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  showModal: (message: string, onConfirm: () => void) => void;
  hideModal: () => void;
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  const showModal = (message: string, onConfirm: () => void) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setMessage("");
    setOnConfirm(() => () => {});
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, isVisible, message, onConfirm }}>
      {children}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p className="mb-4">{message}</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => {
                  onConfirm();
                  hideModal();
                }}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 py-2 px-4 rounded"
                onClick={hideModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
