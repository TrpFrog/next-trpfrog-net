declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  // eslint-disable-next-line no-restricted-exports
  export default MDXComponent
}