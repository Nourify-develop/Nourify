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
  // Identification
  id: number;
  productId?: string;

  // Basic Details
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;

  // Attributes
  size?: string;
  quantity: number;
  limitedOffer?: boolean;
  expressDelivery?: boolean;

  // Status
  status: string;

  // Reviews
  rating?: number;
  reviews?: Array<{
    user?: string;
    comment?: string;
    rating?: number;
  }>;
  totalReviews: number;
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

export type MenuLink = {
  name: string;
  link: string;
  id: number;
};

export type LoginMenuItem = {
  text: string;
  href: string;
  state?: string;
  className?: string;
};

export type Tab = "profile" | "password";
