interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: React.ReactNode
}

export default function Heading ({ as, children, ...rest }: HeadingProps): React.ReactElement {
  const Component = as ?? 'h1'

  return (
    <Component className="text-xl font-semibold tracking-wide" {...rest}>
      {children}
    </Component>
  )
}
