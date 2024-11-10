import { Tag, TagProps } from "antd";

interface ChipProps extends TagProps {
  chipClassName?: string;
}

export const Chip = ({
  chipClassName,
  children,
  ...props
}: ChipProps): JSX.Element => {
  return (
    <Tag
      {...props}
      className={`w-full bg-white text-black border-zinc-600 text-md font-semibold rounded-full flex items-center justify-center cursor-default ${chipClassName}`}
    >
      {children}
    </Tag>
  );
};
