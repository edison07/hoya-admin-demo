import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { FormInput } from "@/components/FormInput";
import { Toast } from "@/components/Toast";
import { loginSchema } from "@/schemas/auth.schema";
import { ValidationError } from "yup";
import logo from "@/assets/logo.png";
import showIcon from "@/assets/show.png";
import hiddenIcon from "@/assets/hidden.png";

interface FormErrors {
  username?: string;
  password?: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const validateForm = async (): Promise<boolean> => {
    try {
      await loginSchema.validate({ username, password }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: FormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path as keyof FormErrors] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleBlur = async (field: keyof FormErrors) => {
    try {
      await loginSchema.validateAt(field, { username, password });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors((prev) => ({ ...prev, [field]: error.message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    try {
      const result = await loginMutation.mutateAsync({ username, password });
      if (result.success) {
        setToast({ type: "success", message: "登入成功！" });
      } else {
        setToast({ type: "error", message: result.message || "登入失敗" });
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "登入失敗，請稍後再試";
      setToast({ type: "error", message });
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex h-screen w-full">
        {/* Left side - Login Form */}
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="max-w-md rounded-2xl bg-white p-8 md:mt-[150px] lg:mt-[80px]">
            {/* Logo / Title */}
            <div className="mb-8">
              <div className="text-primary mb-4 text-3xl font-bold">
                HOYA BIT Admin
              </div>
              <p className="text-secondary mt-2 text-sm font-bold">
                請輸入你的帳號和密碼來登入
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-col space-y-5">
              <FormInput
                label="帳號"
                type="text"
                placeholder="請輸入帳號"
                value={username}
                onChange={handleUsernameChange}
                error={errors.username}
                disabled={loginMutation.isPending}
                autoComplete="username"
              />

              <div className="relative">
                <FormInput
                  label="密碼"
                  type={showPassword ? "text" : "password"}
                  placeholder="請輸入密碼"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur("password")}
                  error={errors.password}
                  disabled={loginMutation.isPending}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-11 right-3"
                >
                  <img
                    src={showPassword ? showIcon : hiddenIcon}
                    alt="Toggle password visibility"
                    className="h-5 w-5"
                  />
                </button>
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="bg-primary mx-auto flex w-[200px] items-center justify-center rounded-lg px-4 py-3 font-bold text-white disabled:opacity-50"
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    登入中...
                  </span>
                ) : (
                  "登入"
                )}
              </button>
            </form>

            {/* Helper Text */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>測試帳號: admin / Admin123</p>
            </div>
          </div>
        </div>
        {/* Right side - Logo */}
        <div className="hidden w-1/2 items-center justify-center lg:flex">
          <img
            src={logo}
            alt="App logo"
            className="w-250px h-60px scale-80"
          ></img>
        </div>
      </div>
    </>
  );
}
