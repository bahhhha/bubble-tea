// cartModel.ts

import { createEvent, createStore } from "effector";
import { Product } from "@/entities/product-card/model";

// Define the CartItem interface
export interface CartItem {
  product: Product;
  quantity: number;
}

// Events to modify the cart
export const productAdded = createEvent<Product>();
export const productRemoved = createEvent<Product>();
export const productQuantitySet = createEvent<{
  product: Product;
  quantity: number;
}>();
export const cartUpdatedFromStorage = createEvent<CartItem[]>();

// The cart store, an array of CartItems
export const $cart = createStore<CartItem[]>([])
  .on(productAdded, (state, product) => {
    const index = state.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      // Increase quantity if product already exists
      const updatedItem = {
        ...state[index],
        quantity: state[index].quantity + 1,
      };
      return [...state.slice(0, index), updatedItem, ...state.slice(index + 1)];
    } else {
      // Add new product with quantity 1
      return [...state, { product, quantity: 1 }];
    }
  })
  .on(productRemoved, (state, product) => {
    const index = state.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      const newQuantity = state[index].quantity - 1;
      if (newQuantity > 0) {
        // Update quantity
        const updatedItem = { ...state[index], quantity: newQuantity };
        return [
          ...state.slice(0, index),
          updatedItem,
          ...state.slice(index + 1),
        ];
      } else {
        // Remove product from cart
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    }
    return state;
  })
  .on(productQuantitySet, (state, { product, quantity }) => {
    const index = state.findIndex((item) => item.product.id === product.id);
    if (quantity > 0) {
      if (index !== -1) {
        // Update existing product quantity
        const updatedItem = { ...state[index], quantity };
        return [
          ...state.slice(0, index),
          updatedItem,
          ...state.slice(index + 1),
        ];
      } else {
        // Add new product with specified quantity
        return [...state, { product, quantity }];
      }
    } else {
      // Remove product if quantity is 0
      if (index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    }
    return state;
  })
  .on(cartUpdatedFromStorage, (_, newCart) => newCart);
