"use client";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalHeader: string;
}
const slideVariants = {
  hidden: { x: "100%", opacity: 0 }, // Start off-screen (right side)
  visible: { x: "0%", opacity: 1, transition: { duration: 0.3 } }, // Slide in
  exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } }, // Slide out
};

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  onClose,
  children,
  modalHeader,
}) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 h-screen w-full flex items-center justify-center md:p-6 md:justify-end bg-black bg-opacity-50 z-50 transition-all duration-150"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className=" flex flex-col gap-6 bg-white py-4 px-4 rounded-lg shadow-lg w-11/12 max-w-lg h-full"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <p className="uppercase font-semibold">{modalHeader}</p>{" "}
              <p
                className="p-2 bg-gray-200 rounded-full cursor-pointer"
                onClick={onClose}
              >
                <IoCloseOutline />
              </p>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
