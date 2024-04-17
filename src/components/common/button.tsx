interface ButtonProps {
  as?: 'button' | 'a' | 'div'
  theme?: 'primary'
  size?: 'small' | 'medium' | 'large'
  children?: React.ReactNode
  [x: string]: unknown
}

const BUTTON_STYLES = {
  primary: `
    border border-gray-700 text-gray-700 font-semibold
    hover:bg-gray-700 hover:text-white
    disabled:bg-gray-300 disabled:text-gray-300
  `
}

const BUTTON_SIZES = {
  medium: 'text-sm px-10 py-2'
}

export default function Button ({ as, theme, size, children, ...rest }: ButtonProps): React.ReactElement {
  const Component = as ?? 'button'
  const className = `
    transition-all cursor-pointer disabled:cursor-not-allowed
    ${BUTTON_STYLES[theme ?? 'primary']}
    ${BUTTON_SIZES[size ?? 'medium']}
  `

  return (
    <Component
      className = {className}
      {...rest}
    >
      {children}
    </Component>
  )
}
