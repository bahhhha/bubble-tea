import { Divider, Modal } from "antd";
import { Product } from "../model";
import Image from "next/image";
import { Tag } from "@/shared/ui/tag/tag";
import { Chip } from "@/shared/ui/chip/chip";
import { Button } from "@/shared/ui/button/button";
import { ShoppingBag } from "lucide-react";
import { useUnit } from "effector-react";
import { productAdded } from "@/features/addProduct/model";

export interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

export const ProductModal = ({ open, onClose, product }: ProductModalProps) => {
  const addProduct = useUnit(productAdded);
  return (
    <Modal
      centered
      onClose={onClose}
      open={open}
      width={780}
      footer={null}
      onCancel={onClose}
    >
      <div className="flex justify-between border-t mt-12 w-full h-96">
        <div className="w-[20rem] h-full flex items-center justify-center">
          <div className="w-80 h-80 flex items-center justify-center bg-zinc-50 rounded-lg">
            <div className="w-72 h-72 relative flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col w-full h-full items-center rounded-lg">
          <div className="flex flex-col w-72">
            <p className="font-bold text-xl my-2">{product.name}</p>
            <div className="flex flex-col gap-1 text-sm mt-2">
              <p className="text-[#364bfe]">Описание</p>
              <p className="text-zinc-600 font-medium">{product.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </div>
            <div className="flex gap-1 mt-8 w-full">
              <Chip chipClassName="w-32">{product.price}$</Chip>
              <Button
                type="primary"
                icon={<ShoppingBag size={16} />}
                onClick={() => {
                  addProduct(product);
                  onClose();
                }}
              >
                В корзину
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
