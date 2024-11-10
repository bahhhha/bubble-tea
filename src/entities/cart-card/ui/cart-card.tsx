"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Chip } from "@/shared/ui/chip/chip";
import { useUnit } from "effector-react";
import {
  $cart,
  productAdded,
  productRemoved,
} from "@/features/addProduct/model";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/entities/product-card/model";

interface CartCardProps {
  product: Product;
}

export const CartCard = ({ product }: CartCardProps): JSX.Element => {
  const [cart, addProduct, removeProduct] = useUnit([
    $cart,
    productAdded,
    productRemoved,
  ]);

  const productCount = cart.filter((p) => p.id === product.id).length;

  return (
    <div className="w-48 h-[24rem] flex flex-col">
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
        <div className="h-24 flex gap-2 flex-col justify-start">
          <p className="font-bold text-sm">{product.name}</p>
          <p className="text-zinc-400 text-xs">{product.description}</p>
        </div>
        <div className="flex justify-center w-full mt-4 h-8">
          <Chip chipClassName="w-1/2">{product.price}$</Chip>
          <div className="flex items-center justify-around px-2 w-full rounded-full bg-[#364bfe] text-white border drop-shadow-md">
            <div
              onClick={() => removeProduct(product)}
              className="cursor-pointer flex justify-center hover:bg-zinc-50 hover:text-[#364bfe] text-white w-5 h-5 rounded-full items-center duration-75"
            >
              <Minus size={12} />
            </div>
            <div className="relative h-4 w-1/3 overflow-hidden flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={productCount}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-semibold absolute left-0 right-0 top-0 text-center"
                >
                  {productCount}
                </motion.span>
              </AnimatePresence>
            </div>
            <div
              onClick={() => addProduct(product)}
              className="cursor-pointer flex justify-center hover:bg-zinc-50 hover:text-[#364bfe] text-white w-5 h-5 rounded-full items-center duration-75"
            >
              <Plus size={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
