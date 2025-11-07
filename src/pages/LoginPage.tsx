import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useLogin } from "@/hooks/useLogin";
import { FormInput } from "@/components/FormInput";
import { loginSchema } from "@/schemas/auth.schema";
import { ValidationError } from "yup";
import logo from "@/assets/logo.png";

interface FormErrors {
  username?: string;
  password?: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();
  const toast = useToast();

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
        toast({
          title: "登入成功",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "登入失敗",
          description: result.message || "帳號或密碼錯誤",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "登入失敗，請稍後再試";
      toast({
        title: "登入失敗",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
    <Flex h="100vh" w="full">
      {/* Left side - Login Form */}
      <Flex w={{ base: "full", lg: "50%" }} align="center" justify="center">
        <Box
          maxW="md"
          bg="white"
          p={8}
          borderRadius="2xl"
          boxShadow="2xl"
          mt={{ base: 0, md: "150px", lg: "80px" }}
        >
          {/* Logo / Title */}
          <VStack spacing={4} mb={8}>
            <Heading size="xl" color="#FF5722">
              HOYA BIT Admin
            </Heading>
            <Text fontSize="sm" fontWeight="bold" color="gray.500">
              請輸入你的帳號和密碼來登入
            </Text>
          </VStack>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
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

              <FormInput
                label="密碼"
                type="password"
                placeholder="請輸入密碼"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur("password")}
                error={errors.password}
                disabled={loginMutation.isPending}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                colorScheme="orange"
                bg="#FF5722"
                w="200px"
                isLoading={loginMutation.isPending}
                loadingText="登入中"
                spinner={<Spinner size="sm" />}
                _hover={{ bg: "#E64A19" }}
              >
                登入
              </Button>
            </VStack>
          </form>

          {/* Helper Text */}
          <Text mt={6} textAlign="center" fontSize="sm" color="gray.600">
            測試帳號: admin / Admin123
          </Text>
        </Box>
      </Flex>

      {/* Right side - Logo */}
      <Flex
        w="50%"
        align="center"
        justify="center"
        display={{ base: "none", lg: "flex" }}
      >
        <Image src={logo} alt="App logo" transform="scale(0.8)" />
      </Flex>
    </Flex>
  );
}
