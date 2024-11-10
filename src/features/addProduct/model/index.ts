// cartModel.ts
import { Product } from "@/entities/product-card/model";
import { createEvent, createStore } from "effector";

const productAdded = createEvent<Product>();
const productRemoved = createEvent<Product>();

const $cart = createStore<Product[]>([])
  .on(productAdded, (state, product) => [...state, product])
  .on(productRemoved, (state, product) => {
    const index = state.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const newState = [...state];
      newState.splice(index, 1);
      return newState;
    }
    return state;
  });

const $cartItems = $cart.map((cart) => {
  const productMap = new Map<string, { product: Product; quantity: number }>();
  for (const product of cart) {
    if (productMap.has(product.id)) {
      productMap.get(product.id)!.quantity += 1;
    } else {
      productMap.set(product.id, { product, quantity: 1 });
    }
  }
  return Array.from(productMap.values());
});

if (typeof window !== "undefined") {
  const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");
  // @ts-ignore
  $cart.setState(initialCart);

  $cart.watch((state) => {
    localStorage.setItem("cart", JSON.stringify(state));
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "cart" && event.newValue) {
      // @ts-ignore
      $cart.setState(JSON.parse(event.newValue));
    }
  });
}

export { $cart, productAdded, productRemoved, $cartItems };
