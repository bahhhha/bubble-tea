import { ConfigProvider } from "antd";

export const AntdProvider = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#364bfe",
        fontFamily: "Manrope",
      },
      components: {
        Button: {
          primaryColor: "#fff",
          colorPrimaryBg: "#364bfe",
          colorBgBase: "#fff",
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);
