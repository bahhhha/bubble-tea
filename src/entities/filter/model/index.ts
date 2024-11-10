import { createStore, createEvent } from "effector";

export interface FilterOption {
  value: string;
  label: string;
}

export interface Filters {
  type: string;
  temperature: string;
  milk: string;
  preparation_time: string;
}

export const filtersUpdated = createEvent<Filters>();

export const $filters = createStore<Filters>({
  type: "All",
  temperature: "All",
  milk: "All",
  preparation_time: "All",
}).on(filtersUpdated, (_, payload) => payload);
