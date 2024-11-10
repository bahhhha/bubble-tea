interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className }: TagProps) => {
  const text = children as string;
  return (
    <div
      className={`text-[#364bfe] bg-[#364bfe] bg-opacity-5 w-fit px-2 py-1 rounded-md ${className}`}
    >
      {text?.at(0)?.toUpperCase() + text.slice(1)}
    </div>
  );
};
