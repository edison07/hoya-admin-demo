import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required("請輸入帳號"),
  password: yup
    .string()
    .required("請輸入密碼")
    .min(8, "密碼格式不符，請再次檢查")
    .max(16, "密碼格式不符，請再次檢查")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/,
      "密碼格式不符，請再次檢查",
    ),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
