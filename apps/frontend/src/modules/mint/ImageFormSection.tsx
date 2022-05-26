import {
  FormControl,
  Text,
  FormControlProps,
  FormLabel,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useFormikContext } from "formik";
import { values } from "lodash";
import Image from "next/image";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { MintFormProps } from "./MintFormProps";

const MAX_SIZE = 3 * 1024 ** 2;

export default function ImageFormSection(props: FormControlProps) {
  const { isSubmitting, values, errors, setFieldError, setFieldValue } =
    useFormikContext<MintFormProps>();

  return (
    <FormControl {...props} isInvalid={!!errors.image}>
      <FormLabel>
        <Text fontWeight={"bold"}>Image</Text>

        {!values.image && (
          <Text>File Types Supported: JPG, PNG, JPEG, GIF</Text>
        )}
      </FormLabel>

      {!isSubmitting && (
        <Dropzone
          onDrop={(files) => setFieldValue("image", files[0])}
          onReject={() => setFieldError("image", "Invalid file type")}
          maxSize={MAX_SIZE}
          accept={IMAGE_MIME_TYPE}
        >
          {() =>
            values.image ? (
              <Text>Drag images here or click to replace image</Text>
            ) : (
              <Text>Drag images here or click to select files</Text>
            )
          }
        </Dropzone>
      )}
      <FormErrorMessage>{errors.image}</FormErrorMessage>

      {values.image && (
        <Box mt="6">
          <Image
            src={URL.createObjectURL(values.image)}
            alt=""
            width="1600"
            height="900"
            objectFit="contain"
          />
        </Box>
      )}
    </FormControl>
  );
}
