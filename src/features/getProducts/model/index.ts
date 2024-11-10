import { sample } from "effector";
import { createGate } from "effector-react";
import { fetchGetProducts } from "./query";

const HomeGate = createGate();

sample({
  clock: HomeGate.open,
  target: fetchGetProducts.start,
});

export { HomeGate };
