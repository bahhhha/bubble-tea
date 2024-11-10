// CartCard.tsx

"use client";

import Image from "next/image";
import { Minus, Plus, Pencil, Check } from "lucide-react";
import { Chip } from "@/shared/ui/chip/chip";
import { useState } from "react";
import { useUnit } from "effector-react";
import {
  productAdded,
  productRemoved,
  productQuantitySet,
} from "@/features/addProduct/model";
import { Product } from "@/entities/product-card/model";
import { InputNumber } from "antd";

interface CartCardProps {
  product: Product;
  quantity: number;
}

export const CartCard = ({ product, quantity }: CartCardProps) => {
  const [addProduct, removeProduct, setProductQuantity] = useUnit([
    productAdded,
    productRemoved,
    productQuantitySet,
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<number>(quantity);

  const handleQuantityUpdate = () => {
    if (inputValue >= 0) {
      setProductQuantity({ product, quantity: inputValue });
    }
    setIsEditing(false);
  };

  return (
    <div className="w-64 h-[24rem] flex flex-col">
      <div className="w-full h-1/2 flex justify-center">
        <div className="w-48 h-48 flex justify-center items-center bg-zinc-50 rounded-lg">
          <div className="relative h-36 w-36">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div className="p-4 w-full relative">
        <div className="h-32 flex gap-2 flex-col justify-start">
          <p className="font-bold text-sm h-12">{product.name}</p>
          <p className="text-zinc-400 text-xs">{product.description}</p>
        </div>
        <div className="flex justify-center w-full mt-4 h-8">
          <Chip chipClassName="w-1/2">{product.retailPrice}₽</Chip>
          <div className="flex items-center justify-around px-2 w-full rounded-full bg-[#364bfe] text-white border drop-shadow-md">
            <div
              onClick={() => removeProduct(product)}
              className="cursor-pointer flex justify-center hover:bg-zinc-50 hover:text-[#364bfe] text-white w-5 h-5 rounded-full items-center duration-75"
            >
              <Minus size={12} />
            </div>
            <div className="relative h-4 w-1/3 overflow-hidden flex justify-center items-center">
              {isEditing ? (
                <InputNumber
                  min={0}
                  controls={false}
                  value={inputValue}
                  onChange={(value) => setInputValue(value ?? 0)}
                  onPressEnter={handleQuantityUpdate}
                  autoFocus
                  className="w-full text-center"
                />
              ) : (
                <span className="text-xs font-semibold">{quantity}</span>
              )}
            </div>
            <div
              onClick={() => addProduct(product)}
              className="cursor-pointer flex justify-center hover:bg-zinc-50 hover:text-[#364bfe] text-white w-5 h-5 rounded-full items-center duration-75"
            >
              <Plus size={12} />
            </div>
            <div
              onClick={() => {
                if (isEditing) {
                  handleQuantityUpdate();
                } else {
                  setInputValue(quantity);
                  setIsEditing(true);
                }
              }}
              className="cursor-pointer flex justify-center hover:bg-zinc-50 hover:text-[#364bfe] text-white w-5 h-5 rounded-full items-center duration-75"
            >
              {isEditing ? <Check size={12} /> : <Pencil size={12} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
