"use client";
import { useUnit } from "effector-react";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { $cart } from "@/features/addProduct/model";

export const CartCounter = () => {
  const cart = useUnit($cart);

  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (totalCount === 0) return null;

  return (
    <Link
      href="/checkout"
      className="flex justify-center items-center gap-2 relative w-16 text-[#364bfe] hover:bg-[#364bfe] cursor-pointer hover:text-white duration-150 h-16 drop-shadow-md p-2 rounded-full bg-white border"
    >
      <ShoppingBag />
      <div className="relative w-3 flex items-center justify-center">
        <AnimatePresence>
          <motion.span
            key={totalCount}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute font-bold ${
              totalCount >= 100 ? "text-xs" : "text-sm"
            }`}
          >
            {totalCount}
          </motion.span>
        </AnimatePresence>
      </div>
    </Link>
  );
};
