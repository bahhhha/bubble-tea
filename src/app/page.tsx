"use client";
import { CartCounter } from "@/entities/cart-counter/ui/cart-counter";
import Filter from "@/entities/filter/ui/filter";
import { Product } from "@/entities/product-card/model";
import { ProductCard } from "@/entities/product-card/ui/product-card";
import { HomeGate } from "@/features/getProducts/model";
import { fetchGetProducts } from "@/features/getProducts/model/query";
import { useGate, useUnit } from "effector-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  useGate(HomeGate);
  const products: Product[] = useUnit(fetchGetProducts.$data ?? []);
  return (
    <div className="flex gap-2 relative p-4">
      <Filter />
      <div className="flex gap-2 flex-wrap">
        <AnimatePresence>
          {products?.slice(1) &&
            products.slice(1).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      <div className="fixed bottom-8 right-8 z-10">
        <CartCounter />
      </div>
    </div>
  );
}
