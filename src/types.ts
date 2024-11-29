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
  productId?: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  size?: string;
  quantity: number;
  limitedOffer?: boolean;
  expressDelivery?: boolean;
  status: string;
  rating?: number;
  reviews?: Array<{
    user?: string;
    comment?: string;
    rating?: number;
  }>; // Correctly defines an array of review objects
  totalReviews?: number;
}

export interface AdminProduct {
  id: number;
  image: string;
  name: string;
  productId: number;
  category: string;
  quantity: number;
  price: number;
  status: string;
  
  
}
export interface Column {
  key: string;
  header: string;
}

export type Tab = "profile" | "password";
