import { useState, useEffect } from "react";

const useCart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [userQuantityLength, setUserQuantityLength] = useState<number>(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    updateUserQuantityLength(storedCart);
  }, []);

  // Helper to calculate total userQuantity
  const updateUserQuantityLength = (updatedCart: any[]) => {
    const totalQuantity = updatedCart.reduce(
      (total, item) => total + (item.userQuantity || 0),
      0
    );
    setUserQuantityLength(totalQuantity);
  };

  // Add to cart
  const addToCart = (product: any, userQuantity: number) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    let updatedCart = [...cart];
    if (existingProductIndex > -1) {
      // Update userQuantity if the product exists
      updatedCart[existingProductIndex].userQuantity += userQuantity;
    } else {
      // Add new product to cart
      updatedCart.push({ ...product, userQuantity });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateUserQuantityLength(updatedCart);
  };

  // Remove from cart and reset quantity
  const removeFromCart = (productId: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, userQuantity: 0 } : item
      )
      .filter((item) => item.id !== productId); // Remove product completely

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateUserQuantityLength(updatedCart);
  };

  // Remove all items from the cart
  const removeAllCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([])); // Clear cart in localStorage
    updateUserQuantityLength([]);
  };

  // Check if a product is in the cart
  const isInCart = (productId: number) => {
    return cart.some((item) => item.id === productId);
  };

  // Update userQuantity
  const updateQuantity = (productId: number, userQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, userQuantity } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateUserQuantityLength(updatedCart);
  };

  return {
    cart,
    userQuantityLength,
    addToCart,
    removeFromCart,
    removeAllCart,
    isInCart,
    updateQuantity,
  };
};

export default useCart;
