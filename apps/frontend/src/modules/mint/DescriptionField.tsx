import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { MintFormProps } from "./MintFormProps";

export default function DescriptionField() {
  const { isSubmitting, errors, touched, getFieldProps } =
    useFormikContext<MintFormProps>();

  return (
    <FormControl isInvalid={!!errors.description && !!touched.description}>
      <FormLabel htmlFor="description" fontWeight={"bold"}>
        Description
      </FormLabel>
      <Textarea
        id="description"
        {...getFieldProps("description")}
        isDisabled={isSubmitting}
      />
      <FormErrorMessage>{errors.description}</FormErrorMessage>
    </FormControl>
  );
}
