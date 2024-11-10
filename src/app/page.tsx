"use client";
import { CartCounter } from "@/entities/cart-counter/ui/cart-counter";
import Filter from "@/entities/filter/ui/filter";
import { ProductCard } from "@/entities/product-card/ui/product-card";
import { mockProducts } from "@/shared/mocks/mockProducts";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <div className="flex gap-2 relative p-4">
      <Filter />
      <div className="flex gap-2 flex-wrap">
        <AnimatePresence>
          {mockProducts.map((product, index) => (
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
