"use client";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TextArea from "antd/es/input/TextArea";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";
import { Label } from "@/shared/ui/label/label";
import { submitted } from "@/features/sendRequest/model";
import { useUnit } from "effector-react";

const initialValues = {
  name: "",
  phoneNumber: "",
  message: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Требуется имя"),
  phoneNumber: Yup.string().required("Требуется номер телефона"),
  message: Yup.string(),
});

export const ContactForm = (): JSX.Element => {
  const submit = useUnit(submitted);
  const handleSubmit = async (values: typeof initialValues) => {
    submit({
      name: values.name,
      phoneNumber: values.phoneNumber,
      message: values.message,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className=" bg-zinc-50 p-8 w-full h-full flex justify-center rounded-lg ">
          <div className="w-[30rem] h-full p-8 space-y-6">
            <div className="flex flex-col">
              <Label htmlFor="name" className="mb-1">
                Имя
              </Label>
              <Field
                name="name"
                as={Input}
                className="w-full"
                placeholder="Введите ваше имя"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="phoneNumber" className="mb-1">
                Телефон
              </Label>
              <Field name="phoneNumber">
                {({ field }: FieldProps) => (
                  <PhoneInput
                    country={"ru"}
                    value={field.value}
                    onChange={(value: string) =>
                      setFieldValue("phoneNumber", value)
                    }
                    placeholder="Введите номер телефона"
                    inputStyle={{
                      borderRadius: "5rem",
                      width: "100%",
                      border: "1px solid #D1D5DB",
                      accentColor: "#364bfe",
                    }}
                    dropdownStyle={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "0.5rem",
                      transitionDuration: "0.5s",
                      accentColor: "#364bfe",
                      fontSize: "12px",
                    }}
                    buttonStyle={{
                      backgroundColor: "white",
                    }}
                    containerStyle={{
                      fontFamily: "inherit",
                      fontSize: "1rem",
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="message" className="mb-1">
                Пожелания
              </Label>
              <Field
                name="message"
                as={TextArea}
                className="w-full"
                placeholder="Введите Ваши пожелания"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex w-full justify-end flex-col gap-2">
              <Button type="primary" htmlType="submit" buttonClassNames="w-24">
                Отправить
              </Button>
              <p className="text-xs text-zinc-400">
                Нажимая на кнопку, вы соглашаетесь с условиями положений{" "}
                <span className="text-[#364bfe] cursor-pointer duration-150 hover:text-[#3743b4]">
                  политики конфиденциальности
                </span>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
