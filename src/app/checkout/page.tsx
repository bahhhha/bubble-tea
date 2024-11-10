"use client";
import { CartCard } from "@/entities/cart-card/ui/cart-card";
import { ContactForm } from "@/entities/contact-form/ui/contact-form";
import { $cartItems } from "@/features/addProduct/model";
import { useUnit } from "effector-react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const cartItems = useUnit($cartItems);

  return (
    <div className="flex justify-center gap-4 h-full px-16 w-full">
      <Link
        href="/"
        className="rounded-full shadow-sm cursor-pointer text-[#364bfe] hover:text-white hover:bg-[#364bfe] duration-75 border border-[#364bfe] border-opacity-10 w-8 h-8 flex justify-center items-center mt-4"
      >
        <ChevronLeft size={16} />
      </Link>
      <div className="w-2/3 flex flex-col gap-4">
        <p className="text-xl font-bold bg-zinc-50 p-4 rounded-lg">Корзина</p>
        <div className="flex gap-4 flex-wrap">
          <AnimatePresence>
            {cartItems.map(({ product }, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CartCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: cartItems.length * 0.1 }}
        >
          <p className="text-xl font-bold text-white bg-[#364bfe] p-4 rounded-lg">
            Оформление заказа
          </p>
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}
