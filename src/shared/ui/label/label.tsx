interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className,
}) => {
  return (
    <label htmlFor={htmlFor} className={`mb-1 text-sm ${className}`}>
      {children}
    </label>
  );
};
