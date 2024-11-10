"use client";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TextArea from "antd/es/input/TextArea";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";
import { Label } from "@/shared/ui/label/label";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  address: {
    city: "",
    streetName: "",
    building: "",
    doorNumber: "",
    additionalInfo: "",
  },
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Требуется имя"),
  email: Yup.string().email("Неправильный e-mail").required("Требуется e-mail"),
  phoneNumber: Yup.string().required("Требуется номер телефона"),
  address: Yup.object().shape({
    city: Yup.string().required("Требуется город"),
    streetName: Yup.string().required("Требуется улица"),
    building: Yup.string(),
    doorNumber: Yup.string(),
    additionalInfo: Yup.string(),
  }),
});

export const ContactForm = (): JSX.Element => {
  const handleSubmit = (values: any) => {
    console.log(values);
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
              <Label htmlFor="email" className="mb-1">
                Email
              </Label>
              <Field
                name="email"
                as={Input}
                className="w-full"
                placeholder="Введите ваш email"
              />
              <ErrorMessage
                name="email"
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
                    country={"ae"}
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
                    masks={{ ae: "+971 ... ... ...." }}
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
              <Label htmlFor="address.city" className="mb-1">
                Город
              </Label>
              <Field
                name="address.city"
                as={Input}
                className="w-full"
                placeholder="Введите город"
              />
              <ErrorMessage
                name="address.city"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="address.streetName" className="mb-1">
                Адрес
              </Label>
              <Field
                name="address.streetName"
                as={Input}
                className="w-full"
                placeholder="Введите название улицы"
              />
              <ErrorMessage
                name="address.streetName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col">
                <Label htmlFor="address.building" className="mb-1">
                  Дом
                </Label>
                <Field
                  name="address.building"
                  as={Input}
                  className="w-full"
                  placeholder="№ дома"
                />
                <ErrorMessage
                  name="address.building"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="address.doorNumber" className="mb-1">
                  Номер двери
                </Label>
                <Field
                  name="address.doorNumber"
                  as={Input}
                  className="w-full"
                  placeholder="№ квартиры/офиса"
                />
                <ErrorMessage
                  name="address.doorNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="address.additionalInfo" className="mb-1">
                Доп. информация
              </Label>
              <Field
                name="address.additionalInfo"
                as={TextArea}
                className="w-full"
                placeholder="Введите дополнительную информацию"
              />
              <ErrorMessage
                name="address.additionalInfo"
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
