import { ChakraTheme, extendTheme } from "@chakra-ui/react";

export default extendTheme(<Partial<ChakraTheme>>{
  fonts: {
    heading: "Work Sans, sans-serif",
    body: "Work Sans, sans-serif",
  },
  components: {
    Button: {
      baseStyle: (props) => ({
        rounded: "xl",
        shadow: `0px 4px 14px ${
          props.colorScheme === "blue" ? "#3182CE40" : "rgba(0 0 0 /10%)"
        }`,
      }),
      defaultProps: {
        colorScheme: "blue",
      },
    },
  },
});
