import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: string;
  qty: number;
};

type CartState = {
  cartItems: CartItem[];
};

type CartActions = {
  addToCart: (item: Omit<CartItem, "qty">) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  getAllItems: () => CartItem[];
  getTotalPrice: () => number;
  getItemCount: () => number;
  clearCart: () => void;
};

const persistCart = (cartItems: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const loadCart = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const useCartStore = create<CartState & CartActions>((set, get) => ({
  cartItems: loadCart(),

  addToCart: (item) =>
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.id === item.id
      );

      let updatedItems;
      if (existingItemIndex !== -1) {
        updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex].qty += 1;
      } else {
        updatedItems = [...state.cartItems, { ...item, qty: 1 }];
      }

      persistCart(updatedItems);
      return { cartItems: updatedItems };
    }),

  updateQuantity: (id, qty) =>
    set((state) => {
      const updatedItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, qty } : item
      );
      persistCart(updatedItems);
      return { cartItems: updatedItems };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedItems = state.cartItems.filter((item) => item.id !== id);
      persistCart(updatedItems);
      return { cartItems: updatedItems };
    }),

  getAllItems: () => get().cartItems,

  getItemCount: () =>
    get().cartItems.reduce((total, item) => total + item.qty, 0),

  getTotalPrice: () =>
    get().cartItems.reduce(
      (total, item) => total + item.qty * parseFloat(item.price),
      0
    ),

  clearCart: () =>
    set(() => {
      persistCart([]);
      return { cartItems: [] };
    }),
}));

export default useCartStore;
