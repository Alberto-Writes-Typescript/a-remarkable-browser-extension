interface ButtonProps {
  as?: 'button' | 'a' | 'div'
  variant?: 'primary'
  size?: 'sm' | 'base'
  children?: React.ReactNode
  [x: string]: unknown
}

export const BUTTON_VARIANTS = {
  primary: `
    border border-gray-700 text-gray-700 font-semibold
    hover:bg-gray-700 hover:text-white
    disabled:bg-gray-300 disabled:text-gray-300
  `
}

export const BUTTON_SIZES = {
  sm: 'text-[10px] h-[24px] px-6',
  base: 'text-sm h-[34px] px-10'
}

export default function Button ({ as, variant, size, children, ...rest }: ButtonProps): React.ReactElement {
  const Component = as ?? 'button'
  const className = `
    transition-all cursor-pointer disabled:cursor-not-allowed
    ${BUTTON_VARIANTS[variant ?? 'primary']}
    ${BUTTON_SIZES[size ?? 'medium']}
    ${rest.className}
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
