import { createEvent, createStore } from "effector";
import { Product } from "@/entities/product-card/model";

export interface CartItem {
  product: Product;
  quantity: number;
}

export const productAdded = createEvent<Product>();
export const productRemoved = createEvent<Product>();
export const productQuantitySet = createEvent<{
  product: Product;
  quantity: number;
}>();
export const cartUpdatedFromStorage = createEvent<CartItem[]>();

export const $cart = createStore<CartItem[]>([])
  .on(productAdded, (state, product) => {
    const index = state.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      const updatedItem = {
        ...state[index],
        quantity: state[index].quantity + 1,
      };
      return [...state.slice(0, index), updatedItem, ...state.slice(index + 1)];
    } else {
      return [...state, { product, quantity: 1 }];
    }
  })
  .on(productRemoved, (state, product) => {
    const index = state.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      const newQuantity = state[index].quantity - 1;
      if (newQuantity > 0) {
        const updatedItem = { ...state[index], quantity: newQuantity };
        return [
          ...state.slice(0, index),
          updatedItem,
          ...state.slice(index + 1),
        ];
      } else {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    }
    return state;
  })
  .on(productQuantitySet, (state, { product, quantity }) => {
    const index = state.findIndex((item) => item.product.id === product.id);
    if (quantity > 0) {
      if (index !== -1) {
        const updatedItem = { ...state[index], quantity };
        return [
          ...state.slice(0, index),
          updatedItem,
          ...state.slice(index + 1),
        ];
      } else {
        return [...state, { product, quantity }];
      }
    } else {
      if (index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    }
    return state;
  })
  .on(cartUpdatedFromStorage, (_, newCart) => newCart);

if (typeof window !== "undefined") {
  const initialCartJSON = localStorage.getItem("cart");
  if (initialCartJSON) {
    try {
      const initialCart: CartItem[] = JSON.parse(initialCartJSON);
      if (Array.isArray(initialCart)) {
        cartUpdatedFromStorage(initialCart);
      } else {
        localStorage.removeItem("cart");
      }
    } catch {
      localStorage.removeItem("cart");
    }
  }

  $cart.watch((state) => {
    localStorage.setItem("cart", JSON.stringify(state));
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "cart" && event.newValue) {
      try {
        const newCart: CartItem[] = JSON.parse(event.newValue);
        if (
          Array.isArray(newCart) &&
          JSON.stringify(newCart) !== JSON.stringify($cart.getState())
        ) {
          cartUpdatedFromStorage(newCart);
        }
      } catch {}
    }
  });
}
