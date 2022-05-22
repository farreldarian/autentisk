import { ChakraTheme, extendTheme } from "@chakra-ui/react";

export default extendTheme(<Partial<ChakraTheme>>{
  fonts: {
    heading: "Work Sans, sans-serif",
    body: "Work Sans, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "xl",
      },
      defaultProps: {
        colorScheme: "blue",
      },
    },
  },
});
