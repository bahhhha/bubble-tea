import { Input as AntdInput, InputProps as AntdInputProps } from "antd";

interface InputProps extends AntdInputProps {
  inputClassNames?: string;
}

export const Input = ({
  inputClassNames,
  ...props
}: InputProps): JSX.Element => {
  return (
    <AntdInput
      {...props}
      className={`rounded-full border ${inputClassNames}`}
    />
  );
};
