import { forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
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
  ({ label, error, ...props }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
          {label}
        </FormLabel>
        <Input
          ref={ref}
          {...props}
          borderColor={error ? "red.500" : "gray.300"}
          _hover={{ borderColor: error ? "red.600" : "gray.400" }}
          _focus={{
            borderColor: error ? "red.600" : "blue.500",
            boxShadow: error ? "0 0 0 1px red.600" : "0 0 0 1px blue.500",
          }}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  }
);

FormInput.displayName = "FormInput";
