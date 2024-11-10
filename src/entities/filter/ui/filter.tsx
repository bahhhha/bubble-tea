"use client";
import React from "react";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { useUnit } from "effector-react";
import { $filters, Filters, filtersUpdated } from "../model";
import { CupSoda, Thermometer, Timer, Milk } from "lucide-react"; // Import relevant icons

const typeOptions = [
  { value: "All", label: "Все" },
  { value: "bubble_tea", label: "Бабл Ти" },
  { value: "frappe", label: "Фраппе" },
  { value: "coffee", label: "Кофе" },
  { value: "lemonade", label: "Лимонад" },
  { value: "shake", label: "Молочный коктейль" },
];

const temperatureOptions = [
  { value: "All", label: "Все" },
  { value: "hot", label: "Горячий" },
  { value: "cold", label: "Холодный" },
];

const milkOptions = [
  { value: "All", label: "Все" },
  { value: "with_milk", label: "С молоком" },
  { value: "no_milk", label: "Без молока" },
];

const preparationTimeOptions = [
  { value: "All", label: "Все" },
  { value: "< 5 mins", label: "< 5 минут" },
  { value: "5-10 mins", label: "5-10 минут" },
  { value: "10+ mins", label: "10+ минут" },
];

const FilterComponent: React.FC = () => {
  const [filters, setFilters] = useUnit([$filters, filtersUpdated]);

  const handleChange = (key: keyof Filters) => (e: RadioChangeEvent) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl py-8 px-12 bg-zinc-50 h-fit w-[32rem]">
      <h2 className="font-bold text-2xl">Фильтры</h2>

      <div>
        <div className="flex items-center gap-2 my-4">
          <CupSoda size={24} className="text-zinc-300" />
          <label className="block text-md font-bold text-black">
            Тип напитка
          </label>
        </div>
        <Radio.Group
          value={filters.type}
          onChange={handleChange("type")}
          className="flex flex-col gap-2"
        >
          {typeOptions.map((option) => (
            <Radio key={option.value} value={option.value} className="text-xs">
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div>
        <div className="flex items-center gap-2 my-4">
          <Thermometer size={24} className="text-zinc-300" />
          <label className="block text-md font-bold text-black">
            Температура
          </label>
        </div>
        <Radio.Group
          value={filters.temperature}
          onChange={handleChange("temperature")}
          className="flex flex-col gap-2"
        >
          {temperatureOptions.map((option) => (
            <Radio key={option.value} value={option.value} className="text-xs">
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div>
        <div className="flex items-center gap-2 my-4">
          <Milk size={24} className="text-zinc-300" />
          <label className="block text-md font-bold text-black">Состав</label>
        </div>
        <Radio.Group
          value={filters.milk}
          onChange={handleChange("milk")}
          className="flex flex-col gap-2"
        >
          {milkOptions.map((option) => (
            <Radio key={option.value} value={option.value} className="text-xs">
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div>
        <div className="flex items-center gap-2 my-4">
          <Timer size={24} className="text-zinc-300" />
          <label className="block text-md font-bold text-black">
            Время приготовления
          </label>
        </div>
        <Radio.Group
          value={filters.preparation_time}
          onChange={handleChange("preparation_time")}
          className="flex flex-col gap-2"
        >
          {preparationTimeOptions.map((option) => (
            <Radio key={option.value} value={option.value} className="text-xs">
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
};

export default FilterComponent;
