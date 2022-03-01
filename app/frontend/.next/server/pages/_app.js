"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./lib/web3/usedapp-config.ts":
/*!************************************!*\
  !*** ./lib/web3/usedapp-config.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _usedapp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @usedapp/core */ \"@usedapp/core\");\n/* harmony import */ var _usedapp_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_usedapp_core__WEBPACK_IMPORTED_MODULE_0__);\n\nconst useDAppConfig = {\n    readOnlyChainId: _usedapp_core__WEBPACK_IMPORTED_MODULE_0__.Rinkeby.chainId,\n    readOnlyUrls: {\n        [_usedapp_core__WEBPACK_IMPORTED_MODULE_0__.Rinkeby.chainId]: \"https://eth-rinkeby.alchemyapi.io/v2/cN-U-aabNb0s2S9H8QklAnM_-GriV9n-\"\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useDAppConfig);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvd2ViMy91c2VkYXBwLWNvbmZpZy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0M7QUFFL0MsS0FBSyxDQUFDQyxhQUFhLEdBQVcsQ0FBQztJQUM3QkMsZUFBZSxFQUFFRiwwREFBZTtJQUNoQ0ksWUFBWSxFQUFFLENBQUM7U0FDWkosMERBQWUsR0FDZCxDQUF1RTtJQUMzRSxDQUFDO0FBQ0gsQ0FBQztBQUVELGlFQUFlQyxhQUFhLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL2xpYi93ZWIzL3VzZWRhcHAtY29uZmlnLnRzPzU3MTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnLCBSaW5rZWJ5IH0gZnJvbSBcIkB1c2VkYXBwL2NvcmVcIjtcclxuXHJcbmNvbnN0IHVzZURBcHBDb25maWc6IENvbmZpZyA9IHtcclxuICByZWFkT25seUNoYWluSWQ6IFJpbmtlYnkuY2hhaW5JZCxcclxuICByZWFkT25seVVybHM6IHtcclxuICAgIFtSaW5rZWJ5LmNoYWluSWRdOlxyXG4gICAgICBcImh0dHBzOi8vZXRoLXJpbmtlYnkuYWxjaGVteWFwaS5pby92Mi9jTi1VLWFhYk5iMHMyUzlIOFFrbEFuTV8tR3JpVjluLVwiLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VEQXBwQ29uZmlnO1xyXG4iXSwibmFtZXMiOlsiUmlua2VieSIsInVzZURBcHBDb25maWciLCJyZWFkT25seUNoYWluSWQiLCJjaGFpbklkIiwicmVhZE9ubHlVcmxzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/web3/usedapp-config.ts\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _usedapp_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @usedapp/core */ \"@usedapp/core\");\n/* harmony import */ var _usedapp_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_usedapp_core__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_web3_usedapp_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/web3/usedapp-config */ \"./lib/web3/usedapp-config.ts\");\n\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    const theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.extendTheme)({\n        fonts: {\n            heading: 'Work Sans, sans-serif',\n            body: 'Work Sans, sans-serif'\n        }\n    });\n    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_usedapp_core__WEBPACK_IMPORTED_MODULE_2__.DAppProvider, {\n        config: _lib_web3_usedapp_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        __source: {\n            fileName: \"D:\\\\BINUS\\\\SKRIPSI 2\\\\app\\\\frontend\\\\pages\\\\_app.tsx\",\n            lineNumber: 14,\n            columnNumber: 5\n        },\n        __self: this,\n        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ChakraProvider, {\n            theme: theme,\n            __source: {\n                fileName: \"D:\\\\BINUS\\\\SKRIPSI 2\\\\app\\\\frontend\\\\pages\\\\_app.tsx\",\n                lineNumber: 15,\n                columnNumber: 7\n            },\n            __self: this,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n                    __source: {\n                        fileName: \"D:\\\\BINUS\\\\SKRIPSI 2\\\\app\\\\frontend\\\\pages\\\\_app.tsx\",\n                        lineNumber: 16,\n                        columnNumber: 9\n                    },\n                    __self: this,\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"link\", {\n                            rel: \"preconnect\",\n                            href: \"https://fonts.googleapis.com\",\n                            __source: {\n                                fileName: \"D:\\\\BINUS\\\\SKRIPSI 2\\\\app\\\\frontend\\\\pages\\\\_app.tsx\",\n                                lineNumber: 17,\n                                columnNumber: 9\n                            },\n                            __self: this\n                        }),\n                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"link\", {\n                            rel: \"preconnect\",\n                            href: \"https://fonts.gstatic.com\",\n                            __source: {\n                                fileName: \"D:\\\\BINUS\\\\SKRIPSI 2\\\\app\\\\frontend\\\\pages\\\\_app.tsx\",\n                                lineNumber: 18,\n                                columnNumber: 9\n                            },\n                            __self: this\n                        }),\n                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"link\", {\n                            href: \"https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;700&display=swap\",\n                            rel: \"stylesheet\",\n                            __source: {\n                                fileName: \"D:\\\\BINUS\\\\SKRIPSI 2\\\\app\\\\frontend\\\\pages\\\\_app.tsx\",\n                                lineNumber: 19,\n                                columnNumber: 9\n                            },\n                            __self: this\n                        })\n                    ]\n                }),\n                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, {\n                    ...pageProps,\n                    __source: {\n                        fileName: \"D:\\\\BINUS\\\\SKRIPSI 2\\\\app\\\\frontend\\\\pages\\\\_app.tsx\",\n                        lineNumber: 21,\n                        columnNumber: 9\n                    },\n                    __self: this\n                })\n            ]\n        })\n    }));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE4RDtBQUNsQjtBQUNoQjtBQUMwQjtTQUU3Q0ssS0FBSyxDQUFDLENBQUMsQ0FBQ0MsU0FBUyxHQUFFQyxTQUFTLEVBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEMsS0FBSyxDQUFDQyxLQUFLLEdBQUdQLDZEQUFXLENBQUMsQ0FBQztRQUN6QlEsS0FBSyxFQUFFLENBQUM7WUFDTkMsT0FBTyxFQUFFLENBQXVCO1lBQ2hDQyxJQUFJLEVBQUUsQ0FBdUI7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLHNFQUNIVCx1REFBWTtRQUFDVSxNQUFNLEVBQUVSLGdFQUFhOzs7Ozs7O3dGQUNoQ0osNERBQWM7WUFBQ1EsS0FBSyxFQUFFQSxLQUFLOzs7Ozs7OztzRkFDekJMLGtEQUFJOzs7Ozs7Ozs2RkFDSlUsQ0FBSTs0QkFBQ0MsR0FBRyxFQUFDLENBQVk7NEJBQUNDLElBQUksRUFBQyxDQUE4Qjs7Ozs7Ozs7NkZBQ3pERixDQUFJOzRCQUFDQyxHQUFHLEVBQUMsQ0FBWTs0QkFBQ0MsSUFBSSxFQUFDLENBQTJCOzs7Ozs7Ozs2RkFDdERGLENBQUk7NEJBQUNFLElBQUksRUFBQyxDQUE4RTs0QkFBQ0QsR0FBRyxFQUFDLENBQVk7Ozs7Ozs7Ozs7cUZBRXpHUixTQUFTO3VCQUFLQyxTQUFTOzs7Ozs7Ozs7OztBQUloQyxDQUFDO0FBRUQsaUVBQWVGLEtBQUssRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFrcmFQcm92aWRlciwgZXh0ZW5kVGhlbWUgfSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xyXG5pbXBvcnQgeyBEQXBwUHJvdmlkZXIgfSBmcm9tIFwiQHVzZWRhcHAvY29yZVwiO1xyXG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XHJcbmltcG9ydCB1c2VEQXBwQ29uZmlnIGZyb20gXCIuLi9saWIvd2ViMy91c2VkYXBwLWNvbmZpZ1wiO1xyXG5cclxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgY29uc3QgdGhlbWUgPSBleHRlbmRUaGVtZSh7XHJcbiAgICBmb250czoge1xyXG4gICAgICBoZWFkaW5nOiAnV29yayBTYW5zLCBzYW5zLXNlcmlmJyxcclxuICAgICAgYm9keTogJ1dvcmsgU2Fucywgc2Fucy1zZXJpZicsXHJcbiAgICB9LFxyXG4gIH0pXHJcbiAgcmV0dXJuIChcclxuICAgIDxEQXBwUHJvdmlkZXIgY29uZmlnPXt1c2VEQXBwQ29uZmlnfT5cclxuICAgICAgPENoYWtyYVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XHJcbiAgICAgICAgPEhlYWQ+XHJcbiAgICAgICAgPGxpbmsgcmVsPVwicHJlY29ubmVjdFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tXCIvPlxyXG4gICAgICAgIDxsaW5rIHJlbD1cInByZWNvbm5lY3RcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbVwiLz5cclxuICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Xb3JrK1NhbnM6d2dodEAzMDA7NzAwJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxyXG4gICAgICAgIDwvSGVhZD5cclxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgIDwvQ2hha3JhUHJvdmlkZXI+XHJcbiAgICA8L0RBcHBQcm92aWRlcj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcclxuIl0sIm5hbWVzIjpbIkNoYWtyYVByb3ZpZGVyIiwiZXh0ZW5kVGhlbWUiLCJEQXBwUHJvdmlkZXIiLCJIZWFkIiwidXNlREFwcENvbmZpZyIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwidGhlbWUiLCJmb250cyIsImhlYWRpbmciLCJib2R5IiwiY29uZmlnIiwibGluayIsInJlbCIsImhyZWYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ "@usedapp/core":
/*!********************************!*\
  !*** external "@usedapp/core" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@usedapp/core");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();