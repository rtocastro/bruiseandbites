import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.cart.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        if (existing.quantity >= item.stock) {
          return state;
        }

        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      if (item.stock <= 0) {
        return state;
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
      cart: state.cart.map((item) => {
        if (item.id !== id) return item;

        const safeQuantity = Math.min(Math.max(1, quantity), item.stock);

        return {
          ...item,
          quantity: safeQuantity,
        };
      }),
    })),

  clearCart: () => set({ cart: [] }),
}));