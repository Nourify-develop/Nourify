import { HTMLAttributes, ReactNode } from "react";

export type TypographyProps = {
  children: ReactNode;
  className?: string;
  isGreen?: boolean;
} & HTMLAttributes<HTMLHeadingElement>;

export type ParagraphProps = {
  children: ReactNode;
  className?: string;
  isGray?: boolean;
} & HTMLAttributes<HTMLParagraphElement>;

export type SmallTextProps = {
  children: ReactNode;
  className?: string;
  isGray?: boolean;
} & HTMLAttributes<HTMLParagraphElement>;

export type ModalProps = {
  children: ReactNode;
  title?: string;
  desc?: string;
  show: boolean;
  closeModal: () => void;
  isSideModal?: boolean;
};

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  size: string;
  limitedOffer: boolean;
  expressDelivery: boolean;
}

export type Tab = "profile" | "password";
