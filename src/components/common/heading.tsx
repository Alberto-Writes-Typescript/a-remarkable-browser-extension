interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: React.ReactNode
  [x: string]: unknown
}

const HEADING_STYLES = {
  h1: '!text-xl',
  h2: '!text-base',
  h3: '!text-sm'
}

export default function Heading ({ as, children, ...rest }: HeadingProps): React.ReactElement {
  const Component = as ?? 'h1'

  return (
    <Component
      className={ `text-xl font-semibold tracking-wide ${HEADING_STYLES[Component]}` }
      {...rest}
    >
      {children}
    </Component>
  )
}
