import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";

interface ButtonProps extends AntdButtonProps {
  buttonClassNames?: string;
}

export const Button = ({
  buttonClassNames,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <AntdButton
      {...props}
      className={`rounded-full w-full ${buttonClassNames}`}
    />
  );
};
