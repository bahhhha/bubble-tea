"use client";

import { Button } from "@/shared/ui/button/button";
import { Product } from "../model";
import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Chip } from "@/shared/ui/chip/chip";
import { useState } from "react";
import { ProductModal } from "../components/product-modal";
import { useUnit } from "effector-react";
import {
  $cart,
  productAdded,
  productRemoved,
} from "@/features/addProduct/model";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, addProduct, removeProduct] = useUnit([
    $cart,
    productAdded,
    productRemoved,
  ]);

  const productCount = cart.filter((p) => p.id === product.id).length;

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-72 h-[28rem] flex flex-col ">
        <div className="w-full h-1/2 flex justify-center">
          <div className="w-64 h-56 flex justify-center items-center bg-zinc-50 rounded-lg">
            <div className="relative h-56 w-56">
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
          <div className="h-16 flex gap-2 flex-col">
            <p className="font-bold h-1/2 text-md">{product.name}</p>
            <p className="text-zinc-400 text-xs">{product.description}</p>
          </div>
          <div className="flex justify-center w-full mt-4 h-8">
            <Chip chipClassName="w-1/2">{product.price}$</Chip>
            {productCount >= 1 ? (
              <div className="flex items-center justify-around w-full rounded-full bg-[#364bfe] text-white border drop-shadow-md">
                <div
                  onClick={() => removeProduct(product)}
                  className="cursor-pointer flex justify-center hover:bg-zinc-50 hover:text-[#364bfe] text-white w-6 h-6 rounded-full items-center duration-75"
                >
                  <Minus size={16} />
                </div>
                <div className="relative h-5 w-1/3 overflow-hidden flex justify-center items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={productCount}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-semibold absolute left-0 right-0 top-0 text-center"
                    >
                      {productCount}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div
                  onClick={() => addProduct(product)}
                  className="cursor-pointer flex justify-center hover:bg-zinc-50 hover:text-[#364bfe] text-white w-6 h-6 rounded-full items-center duration-75"
                >
                  <Plus size={16} />
                </div>
              </div>
            ) : (
              <div className="w-1/2">
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
