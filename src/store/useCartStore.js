import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.cart.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),

  clearCart: () => set({ cart: [] }),
}));