import { forwardRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

interface FormInputProps {
  label: string;
  error?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  disabled?: boolean;
  autoComplete?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;

    const inputElement = (
      <Input
        ref={ref}
        type={inputType}
        pr={isPasswordType ? "4.5rem" : undefined}
        {...props}
        borderColor={error ? "red.500" : "gray.300"}
        _hover={{ borderColor: error ? "red.600" : "gray.400" }}
        _focus={{
          borderColor: error ? "red.600" : "#FF5722",
          boxShadow: error
            ? "0 0 0 1px #E53E3E"
            : "0 0 0 1px #FF5722",
        }}
      />
    );

    return (
      <FormControl isInvalid={!!error}>
        <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
          {label}
        </FormLabel>
        {isPasswordType ? (
          <InputGroup size="md">
            {inputElement}
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                isDisabled={props.disabled}
                variant="ghost"
              >
                {showPassword ? "隱藏" : "顯示"}
              </Button>
            </InputRightElement>
          </InputGroup>
        ) : (
          inputElement
        )}
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  }
);

FormInput.displayName = "FormInput";
