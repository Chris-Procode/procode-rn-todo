declare module '*.png' {
  const value: any; // You can use `string` for the path or `any` if the file is treated as a module
  export default value;
}
