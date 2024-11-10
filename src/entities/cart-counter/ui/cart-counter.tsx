"use client";
import { $cart } from "@/features/addProduct/model";
import { useStoreMap } from "effector-react";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const CartCounter = (): JSX.Element => {
  const count = useStoreMap($cart, (cart) => cart.length);
  if (count === 0) {
    return <></>;
  }

  return (
    <Link
      href="/checkout"
      className="flex justify-center items-center gap-1 relative w-16 text-[#364bfe] hover:bg-[#364bfe] cursor-pointer hover:text-white duration-150 h-16 drop-shadow-md p-2 rounded-full bg-white border"
    >
      <ShoppingBag />
      <div className="relative w-3 flex items-center justify-center">
        <AnimatePresence>
          <motion.span
            key={count}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute text-sm font-bold"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </div>
    </Link>
  );
};
