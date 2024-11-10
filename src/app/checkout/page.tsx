"use client";
import { useUnit } from "effector-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { $cart } from "@/features/addProduct/model";
import { CartCard } from "@/entities/cart-card/ui/cart-card";
import { ContactForm } from "@/entities/contact-form/ui/contact-form";

export default function Checkout() {
  const cartItems = useUnit($cart);

  return (
    <div className="flex justify-center gap-4 h-full px-16 w-full">
      <Link
        href="/"
        className="rounded-full shadow-sm cursor-pointer text-[#364bfe] hover:text-white hover:bg-[#364bfe] duration-75 border border-[#364bfe] border-opacity-10 w-8 h-8 flex justify-center items-center mt-4"
      >
        <ChevronLeft size={16} />
      </Link>
      <div className="w-2/3 flex flex-col gap-4">
        <p className="text-xl font-bold bg-zinc-50 p-4 rounded-lg">Cart</p>
        <div className="flex gap-4 flex-wrap">
          <AnimatePresence>
            {cartItems.map((cartItem, index) => (
              <motion.div
                key={cartItem.product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CartCard
                  product={cartItem.product}
                  quantity={cartItem.quantity}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="w-1/3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: cartItems.length * 0.1 }}
          className="flex flex-col gap-4"
        >
          <p className="text-xl font-bold text-white bg-[#364bfe] p-4 rounded-lg">
            Checkout
          </p>
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}
