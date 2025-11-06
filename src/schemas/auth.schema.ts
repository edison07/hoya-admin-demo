import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required("請輸入帳號"),
  password: yup
    .string()
    .required("請輸入密碼")
    .min(8, "密碼必須至少 8 個字元")
    .max(16, "密碼不能超過 16 個字元")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/,
      "密碼必須包含大寫字母、小寫字母和數字，長度為 8-16 個字元",
    ),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
