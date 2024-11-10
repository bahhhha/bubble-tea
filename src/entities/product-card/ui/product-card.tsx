// ProductCard.tsx

"use client";
import { useState } from "react";
import { useUnit } from "effector-react";
import { InputNumber } from "antd";
import { Product } from "../model";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Pencil, Check } from "lucide-react";
import {
  $cart,
  productAdded,
  productRemoved,
  productQuantitySet,
} from "@/features/addProduct/model";
import { Button } from "@/shared/ui/button/button";
import { Chip } from "@/shared/ui/chip/chip";
import { ProductModal } from "../components/product-modal";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useUnit($cart);
  const [addProduct, removeProduct, setProductQuantity] = useUnit([
    productAdded,
    productRemoved,
    productQuantitySet,
  ]);

  const cartItem = cart.find((item) => item.product.id === product.id);
  const productCount = cartItem ? cartItem.quantity : 0;

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<number>(productCount);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleQuantityUpdate = () => {
    if (inputValue >= 0) {
      setProductQuantity({ product, quantity: inputValue });
    }
    setIsEditing(false);
  };

  return (
    <>
      <div className="w-72 h-[28rem] flex flex-col">
        <div className="w-full h-1/2 flex justify-center">
          <div className="relative h-64 w-64">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain rounded-md"
            />
          </div>
        </div>
        <div className="p-4 w-full relative">
          <div className="h-24 flex gap-2 flex-col">
            <p className="font-bold h-1/2 text-md">{product.name}</p>
            <p className="text-zinc-400 text-xs">{product.description}</p>
          </div>
          <div className="flex flex-col items-center w-full mt-4">
            <div className="flex justify-center w-full h-8">
              <Chip chipClassName="w-1/3">{product.retailPrice}₽</Chip>
              {productCount >= 1 ? (
                <div className="flex items-center px-2 justify-around w-full rounded-full bg-[#364bfe] text-white border drop-shadow-md">
                  {!isEditing && (
                    <div
                      onClick={() => {
                        removeProduct(product);
                      }}
                      className="cursor-pointer flex justify-center hover:bg-zinc-50 hover:text-[#364bfe] text-white w-6 h-6 rounded-full items-center duration-75"
                    >
                      <Minus size={16} />
                    </div>
                  )}
                  <div className="relative h-5 w-2/3 overflow-hidden flex justify-center items-center">
                    {isEditing ? (
                      <InputNumber
                        min={0}
                        value={inputValue}
                        onChange={(value) => setInputValue(value ?? 0)}
                        onPressEnter={handleQuantityUpdate}
                        autoFocus
                        controls={false}
                        className="w-full text-center"
                      />
                    ) : (
                      <span className="text-sm font-semibold">
                        {productCount}
                      </span>
                    )}
                  </div>
                  {!isEditing && (
                    <div
                      onClick={() => addProduct(product)}
                      className="cursor-pointer flex justify-center hover:bg-zinc-50 hover:text-[#364bfe] text-white w-6 h-6 rounded-full items-center duration-75"
                    >
                      <Plus size={16} />
                    </div>
                  )}
                  <div
                    onClick={() => {
                      if (isEditing) {
                        handleQuantityUpdate();
                      } else {
                        setInputValue(productCount);
                        setIsEditing(true);
                      }
                    }}
                    className="cursor-pointer flex justify-center hover:bg-zinc-50 hover:text-[#364bfe] text-white w-6 h-6 rounded-full items-center duration-75"
                  >
                    {isEditing ? <Check size={16} /> : <Pencil size={12} />}
                  </div>
                </div>
              ) : (
                <div className="w-2/3">
                  <Button
                    type="default"
                    onClick={() => addProduct(product)}
                    buttonClassNames="border-[#364bfe]"
                    icon={<ShoppingBag size={16} />}
                    iconPosition="start"
                  >
                    В корзину
                  </Button>
                </div>
              )}
            </div>
          </div>
          <Button
            buttonClassNames="w-full mt-3"
            type="primary"
            onClick={showModal}
          >
            Подробнее
          </Button>
        </div>
      </div>
      <ProductModal
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        product={product}
      />
    </>
  );
};
