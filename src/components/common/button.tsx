export type ButtonVariant = keyof typeof BUTTON_VARIANTS

export type ButtonSize = keyof typeof BUTTON_SIZES

interface ButtonProps {
  as?: 'button' | 'a' | 'div'
  variant?: ButtonVariant
  size?: ButtonSize
  children?: React.ReactNode
  [x: string]: unknown
}

export const BUTTON_VARIANTS = {
  primary: `
    border border-gray-700 text-gray-700 font-semibold
    hover:bg-gray-700 hover:text-white
    disabled:bg-gray-100 disabled:text-gray-500
  `,
  transparent: `
    text-gray-700 font-semibold
    hover:bg-gray-700 hover:text-white
    disabled:bg-gray-100 disabled:text-gray-500
  `
}

export const BUTTON_SIZES = {
  sm: 'text-[10px] h-[24px] px-6',
  base: 'text-sm h-[34px] px-10',
  lg: 'text-lg h-[38px] px-12'
}

export default function Button ({ as, variant, size, children, ...rest }: ButtonProps): React.ReactElement {
  const Component = as ?? 'button'

  const className = `
    flex items-center justify-center
    transition-all cursor-pointer disabled:cursor-not-allowed
    ${BUTTON_VARIANTS[variant ?? 'primary']}
    ${BUTTON_SIZES[size ?? 'medium']}
    ${rest.className as string}
  `

  delete rest.className

  return (
    <Component className = {className} {...rest}>
      {children}
    </Component>
  )
}
